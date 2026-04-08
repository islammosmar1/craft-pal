import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Phone, ArrowRight, Clock, MessageCircle, CheckCircle, User, Send, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceRequestDialog from "@/components/ServiceRequestDialog";
import ChatWindow from "@/components/ChatWindow";
import { useAuth } from "@/contexts/AuthContext";

interface CraftsmanData {
  id: string;
  specialty_name: string;
  city: string;
  phone: string;
  description: string | null;
  experience_years: number;
  available: boolean;
  rating: number;
  review_count: number;
  address: string | null;
  profiles: { full_name: string; avatar_url: string | null } | null;
  service_categories: { name: string; icon: string; slug: string } | null;
}

interface ReviewData {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  profiles: { full_name: string } | null;
}

const CraftsmanProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [craftsman, setCraftsman] = useState<CraftsmanData | null>(null);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestOpen, setRequestOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [craftsmanUserId, setCraftsmanUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchCraftsman();
  }, [id]);

  const fetchCraftsman = async () => {
    if (!id) return;
    const { data } = await supabase
      .from("craftsman_profiles")
      .select("*, profiles!craftsman_profiles_user_id_profiles_fkey(full_name, avatar_url), service_categories(name, icon, slug)")
      .eq("id", id)
      .single();

    if (data) {
      setCraftsman(data as unknown as CraftsmanData);
      setCraftsmanUserId((data as any).user_id);
      const { data: reviewsData } = await supabase
        .from("reviews")
        .select("*, profiles!reviews_user_id_fkey(full_name)")
        .eq("craftsman_id", id)
        .order("created_at", { ascending: false });
      if (reviewsData) setReviews(reviewsData as unknown as ReviewData[]);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-cairo">
        <Navbar />
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-20 text-center">
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!craftsman) {
    return (
      <div className="min-h-screen bg-background font-cairo">
        <Navbar />
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-20 text-center">
          <div className="text-6xl mb-6">🔍</div>
          <h2 className="text-2xl font-bold text-foreground mb-4">لم يتم العثور على الحرفي</h2>
          <Link to="/" className="text-accent hover:underline">العودة للرئيسية</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const name = craftsman.profiles?.full_name || "حرفي";
  const categoryName = craftsman.service_categories?.name || craftsman.specialty_name;
  const categoryIcon = craftsman.service_categories?.icon || "🔧";
  const categorySlug = craftsman.service_categories?.slug || "";

  return (
    <div className="min-h-screen bg-background font-cairo">
      <Navbar />

      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-accent transition-colors">الرئيسية</Link>
          <ArrowRight className="w-3 h-3 rotate-180" />
          <Link to={`/craftsmen?category=${categorySlug}`} className="hover:text-accent transition-colors">
            {categoryName}
          </Link>
          <ArrowRight className="w-3 h-3 rotate-180" />
          <span className="text-foreground">{name}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl border border-border/40 shadow-card overflow-hidden">
              <div className="bg-gradient-to-l from-primary/[0.06] to-primary/[0.1] p-8 lg:p-10">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-accent/10 flex items-center justify-center text-5xl shrink-0">
                    {categoryIcon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">{name}</h1>
                      {craftsman.available && (
                        <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          متاح
                        </span>
                      )}
                    </div>
                    <p className="text-accent font-bold text-lg mb-4">{categoryName}</p>
                    <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-accent/60" /> {craftsman.city}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent/60" /> {craftsman.experience_years} سنة خبرة
                      </span>
                      <span className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        {Number(craftsman.rating).toFixed(1)} ({craftsman.review_count} تقييم)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-10">
                <h2 className="font-bold text-foreground mb-3 text-lg">عن الحرفي</h2>
                <p className="text-muted-foreground leading-relaxed text-base">{craftsman.description || "لا يوجد وصف"}</p>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-card rounded-2xl border border-border/40 shadow-card p-8 lg:p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-foreground">التقييمات والمراجعات</h2>
                <span className="bg-accent/10 text-accent text-sm font-medium px-3 py-1 rounded-full">
                  {reviews.length} تقييم
                </span>
              </div>
              {reviews.length > 0 ? (
                <div className="space-y-5">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-secondary/50 rounded-xl p-5 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-accent" />
                          </div>
                          <span className="font-semibold text-foreground">{review.profiles?.full_name || "مستخدم"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-accent fill-accent" : "text-border"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
                      <p className="text-xs text-muted-foreground/50 mt-3">{new Date(review.created_at).toLocaleDateString('ar')}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <p>لا توجد تقييمات بعد</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-card rounded-2xl border border-border/40 shadow-card p-6 lg:p-8 sticky top-24">
              <h3 className="font-bold text-foreground text-lg mb-5">تواصل مع الحرفي</h3>
              <div className="space-y-3">
                <Button variant="accent" className="w-full gap-2 h-12 text-base" onClick={() => setRequestOpen(true)}>
                  <Send className="w-5 h-5" />
                  اطلب خدمة
                </Button>
                <a href={`tel:${craftsman.phone.replace(/-/g, "")}`} className="block">
                  <Button variant="outline" className="w-full gap-2 h-12 text-base">
                    <Phone className="w-5 h-5" />
                    اتصال مباشر
                  </Button>
                </a>
                <a href={`https://wa.me/970${craftsman.phone.replace(/[^0-9]/g, "").slice(1)}`} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="outline" className="w-full gap-2 h-12 text-base">
                    <MessageCircle className="w-5 h-5" />
                    واتساب
                  </Button>
                </a>
                {user && craftsmanUserId && user.id !== craftsmanUserId && (
                  <Button variant="outline" className="w-full gap-2 h-12 text-base" onClick={() => setChatOpen(!chatOpen)}>
                    <Mail className="w-5 h-5" />
                    {chatOpen ? "إغلاق المحادثة" : "مراسلة مباشرة"}
                  </Button>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-border/40 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">الموقع</span>
                  <span className="text-foreground font-medium text-sm">{craftsman.city}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">التخصص</span>
                  <span className="text-foreground font-medium text-sm">{categoryName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">الخبرة</span>
                  <span className="text-foreground font-medium text-sm">{craftsman.experience_years} سنة</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">الحالة</span>
                  <span className={`text-sm font-medium ${craftsman.available ? "text-green-600" : "text-muted-foreground"}`}>
                    {craftsman.available ? "متاح الآن" : "غير متاح"}
                  </span>
                </div>
              </div>
            </div>

            {/* Chat Window */}
            {chatOpen && craftsmanUserId && (
              <div className="bg-card rounded-2xl border border-border/40 shadow-card overflow-hidden h-[450px]">
                <ChatWindow receiverId={craftsmanUserId} receiverName={name} onBack={() => setChatOpen(false)} />
              </div>
            )}
          </div>
        </div>
      </div>

      <ServiceRequestDialog
        open={requestOpen}
        onOpenChange={setRequestOpen}
        craftsmanId={craftsman.id}
        craftsmanName={name}
      />

      <Footer />
    </div>
  );
};

export default CraftsmanProfile;
