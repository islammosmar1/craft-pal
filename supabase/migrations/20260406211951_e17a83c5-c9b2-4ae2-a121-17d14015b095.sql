
-- Add unique constraint on profiles.user_id
ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);

-- Add FK from craftsman_profiles.user_id to profiles.user_id (different name)
ALTER TABLE public.craftsman_profiles
  ADD CONSTRAINT craftsman_profiles_user_id_profiles_fkey
  FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'general',
  is_read BOOLEAN NOT NULL DEFAULT false,
  related_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications"
  ON public.notifications FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications"
  ON public.notifications FOR INSERT WITH CHECK (true);

-- Trigger: notify craftsman on new request
CREATE OR REPLACE FUNCTION public.notify_craftsman_on_request()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE craftsman_user_id UUID;
BEGIN
  SELECT user_id INTO craftsman_user_id FROM public.craftsman_profiles WHERE id = NEW.craftsman_id;
  IF craftsman_user_id IS NOT NULL THEN
    INSERT INTO public.notifications (user_id, title, message, type, related_id)
    VALUES (craftsman_user_id, 'طلب خدمة جديد', 'لديك طلب خدمة جديد: ' || NEW.title, 'new_request', NEW.id);
  END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_new_service_request
  AFTER INSERT ON public.service_requests FOR EACH ROW
  EXECUTE FUNCTION public.notify_craftsman_on_request();

ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
