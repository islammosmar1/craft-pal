
-- Create roles enum
CREATE TYPE public.app_role AS ENUM ('user', 'craftsman', 'admin');

-- Create request status enum
CREATE TYPE public.request_status AS ENUM ('pending', 'accepted', 'in_progress', 'completed', 'cancelled');

-- Create approval status enum
CREATE TYPE public.approval_status AS ENUM ('pending', 'approved', 'rejected');

-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ========== PROFILES ==========
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  phone TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========== USER ROLES ==========
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Auto-assign 'user' role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- ========== SERVICE CATEGORIES ==========
CREATE TABLE public.service_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL DEFAULT '🔧',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are viewable by everyone" ON public.service_categories FOR SELECT USING (true);

-- ========== CRAFTSMAN PROFILES ==========
CREATE TABLE public.craftsman_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  category_id UUID REFERENCES public.service_categories(id),
  specialty_name TEXT NOT NULL,
  experience_years INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  city TEXT NOT NULL,
  address TEXT,
  phone TEXT NOT NULL,
  available BOOLEAN NOT NULL DEFAULT true,
  approval_status approval_status NOT NULL DEFAULT 'pending',
  rating NUMERIC(3,2) NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.craftsman_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved craftsmen are viewable by everyone" ON public.craftsman_profiles FOR SELECT USING (approval_status = 'approved' OR auth.uid() = user_id);
CREATE POLICY "Users can insert their own craftsman profile" ON public.craftsman_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own craftsman profile" ON public.craftsman_profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER update_craftsman_profiles_updated_at BEFORE UPDATE ON public.craftsman_profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ========== CRAFTSMAN GALLERY ==========
CREATE TABLE public.craftsman_gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  craftsman_id UUID REFERENCES public.craftsman_profiles(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.craftsman_gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery images are viewable by everyone" ON public.craftsman_gallery FOR SELECT USING (true);
CREATE POLICY "Craftsmen can manage their gallery" ON public.craftsman_gallery FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.craftsman_profiles WHERE id = craftsman_id AND user_id = auth.uid()));
CREATE POLICY "Craftsmen can delete their gallery images" ON public.craftsman_gallery FOR DELETE 
  USING (EXISTS (SELECT 1 FROM public.craftsman_profiles WHERE id = craftsman_id AND user_id = auth.uid()));

-- ========== REVIEWS ==========
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  craftsman_id UUID REFERENCES public.craftsman_profiles(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reviews" ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- Update craftsman rating on new review
CREATE OR REPLACE FUNCTION public.update_craftsman_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.craftsman_profiles
  SET rating = (SELECT COALESCE(AVG(rating), 0) FROM public.reviews WHERE craftsman_id = COALESCE(NEW.craftsman_id, OLD.craftsman_id)),
      review_count = (SELECT COUNT(*) FROM public.reviews WHERE craftsman_id = COALESCE(NEW.craftsman_id, OLD.craftsman_id))
  WHERE id = COALESCE(NEW.craftsman_id, OLD.craftsman_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_rating_on_review
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_craftsman_rating();

-- ========== SERVICE REQUESTS ==========
CREATE TABLE public.service_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  craftsman_id UUID REFERENCES public.craftsman_profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  status request_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own requests" ON public.service_requests FOR SELECT 
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.craftsman_profiles WHERE id = craftsman_id AND user_id = auth.uid()));
CREATE POLICY "Users can create requests" ON public.service_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Request participants can update" ON public.service_requests FOR UPDATE 
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.craftsman_profiles WHERE id = craftsman_id AND user_id = auth.uid()));

CREATE TRIGGER update_service_requests_updated_at BEFORE UPDATE ON public.service_requests
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ========== STORAGE ==========
INSERT INTO storage.buckets (id, name, public) VALUES ('craftsman-images', 'craftsman-images', true);

CREATE POLICY "Anyone can view craftsman images" ON storage.objects FOR SELECT USING (bucket_id = 'craftsman-images');
CREATE POLICY "Authenticated users can upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'craftsman-images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can delete their own images" ON storage.objects FOR DELETE USING (bucket_id = 'craftsman-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ========== SEED SERVICE CATEGORIES ==========
INSERT INTO public.service_categories (name, slug, icon, description) VALUES
  ('دهان', 'painting', '🎨', 'خدمات الدهان والطلاء الداخلي والخارجي'),
  ('كهرباء', 'electricity', '⚡', 'تمديدات كهربائية وصيانة وإصلاح'),
  ('بلاط', 'tiles', '🔲', 'تركيب وصيانة البلاط والسيراميك'),
  ('سباكة', 'plumbing', '🔧', 'خدمات السباكة وصيانة المياه'),
  ('نجارة', 'carpentry', '🪚', 'أعمال النجارة والأثاث'),
  ('بناء', 'construction', '🏗️', 'أعمال البناء والتشييد'),
  ('تمديدات', 'wiring', '🔌', 'تمديدات الشبكات والكابلات'),
  ('تكييف', 'ac', '❄️', 'تركيب وصيانة أنظمة التكييف');
