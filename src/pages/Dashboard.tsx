import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { User, Briefcase, FileText, Star, Clock, CheckCircle, XCircle, MapPin, Phone, Mail, Shield, TrendingUp } from "lucide-react";

interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  craftsman_id: string;
}

interface CraftsmanProfile {
  id: string;
  specialty_name: string;
  city: string;
  rating: number;
  review_count: number;
  available: boolean;
  approval_status: string;
}

const statusMap: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "قيد الانتظار", color: "text-yellow-600 bg-yellow-500/10 border-yellow-500/20", icon: Clock },
  accepted: { label: "مقبول", color: "text-blue-600 bg-blue-500/10 border-blue-500/20", icon: CheckCircle },
  in_progress: { label: "قيد التنفيذ", color: "text-accent bg-accent/10 border-accent/20", icon: Clock },
  completed: { label: "مكتمل", color: "text-green-600 bg-green-500/10 border-green-500/20", icon: CheckCircle },
  cancelled: { label: "ملغي", color: "text-red-600 bg-red-500/10 border-red-500/20", icon: XCircle },
};

const Dashboard = () => {
  const { user, isCraftsman } = useAuth();
  const [profile, setProfile] = useState<{ full_name: string; phone: string; city: string } | null>(null);
  const [craftsmanProfile, setCraftsmanProfile] = useState<CraftsmanProfile | null>(null);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    if (!user) return;
    fetchData();
  }, [user]);

  const fetchData = async () => {
    if (!user) return;

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();
    if (profileData) setProfile(profileData);

    const { data: myRequests } = await supabase
      .from("service_requests")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (myRequests) setRequests(myRequests);

    if (isCraftsman) {
      const { data: cp } = await supabase
        .from("craftsman_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (cp) {
        setCraftsmanProfile(cp);
        const { data: incoming } = await supabase
          .from("service_requests")
          .select("*")
          .eq("craftsman_id", cp.id)
          .order("created_at", { ascending: false });
        if (incoming) setIncomingRequests(incoming);
      }
    }
  };

  const updateRequestStatus = async (requestId: string, status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled") => {
    await supabase
      .from("service_requests")
      .update({ status })
      .eq("id", requestId);
    fetchData();
  };

  const statsCards = [
    { label: "طلباتي", value: requests.length, icon: FileText, gradient: "from-accent/10 to-accent/5" },
    { label: "مكتملة", value: requests.filter(r => r.status === "completed").length, icon: CheckCircle, gradient: "from-green-500/10 to-green-500/5" },
    ...(isCraftsman ? [
      { label: "طلبات واردة", value: incomingRequests.length, icon: TrendingUp, gradient: "from-blue-500/10 to-blue-500/5" },
      { label: "التقييم", value: craftsmanProfile ? `⭐ ${Number(craftsmanProfile.rating).toFixed(1)}` : "—", icon: Star, gradient: "from-yellow-500/10 to-yellow-500/5" },
    ] : []),
  ];

  return (
    <div className="min-h-screen bg-background font-cairo">
      <Navbar />

      {/* Header */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0" style={{ background: "var(--hero-gradient)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(24_90%_55%/0.12),transparent_60%)]" />
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-10 lg:py-14">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-accent/20 backdrop-blur-sm flex items-center justify-center">
              <User className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-primary-foreground font-cairo">
                مرحباً، {profile?.full_name || "مستخدم"} 👋
              </h1>
              <p className="text-primary-foreground/60 text-sm mt-1">إدارة حسابك وطلباتك من مكان واحد</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 -mt-6 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((card) => (
            <div key={card.label} className={`bg-card rounded-2xl border border-border/40 shadow-card p-5 bg-gradient-to-br ${card.gradient}`}>
              <div className="flex items-center justify-between mb-2">
                <card.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="text-2xl font-extrabold text-foreground">{card.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{card.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border/40 shadow-card overflow-hidden">
              <div className="h-2 bg-gradient-to-l" style={{ backgroundImage: "var(--accent-gradient)" }} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{profile?.full_name}</h3>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{profile?.phone || "غير محدد"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{profile?.city || "غير محددة"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-3.5 h-3.5" />
                    <span dir="ltr" className="text-xs">{user?.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {!isCraftsman && (
              <Link to="/register-craftsman">
                <Button variant="accent" className="w-full gap-2 h-12 rounded-xl font-bold">
                  <Briefcase className="w-4 h-4" />
                  سجّل كحرفي
                </Button>
              </Link>
            )}

            {craftsmanProfile && (
              <div className="bg-card rounded-2xl border border-border/40 shadow-card overflow-hidden">
                <div className="h-2 bg-gradient-to-l from-blue-500 to-blue-400" />
                <div className="p-6">
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-accent" />
                    ملف الحرفي
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">التخصص</span>
                      <span className="font-medium text-foreground">{craftsmanProfile.specialty_name}</span>
                    </div>
                    <div className="border-t border-border/30" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">المدينة</span>
                      <span className="font-medium text-foreground">{craftsmanProfile.city}</span>
                    </div>
                    <div className="border-t border-border/30" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">التقييم</span>
                      <span className="font-medium text-foreground">⭐ {Number(craftsmanProfile.rating).toFixed(1)} ({craftsmanProfile.review_count})</span>
                    </div>
                    <div className="border-t border-border/30" />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">الحالة</span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        craftsmanProfile.approval_status === 'approved' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                        craftsmanProfile.approval_status === 'pending' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' :
                        'bg-red-500/10 text-red-600 border-red-500/20'
                      }`}>
                        <Shield className="w-3 h-3" />
                        {craftsmanProfile.approval_status === 'approved' ? 'معتمد' :
                         craftsmanProfile.approval_status === 'pending' ? 'قيد المراجعة' : 'مرفوض'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Requests */}
            <div className="bg-card rounded-2xl border border-border/40 shadow-card overflow-hidden">
              <div className="px-6 py-5 border-b border-border/30">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  طلباتي
                  {requests.length > 0 && (
                    <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">{requests.length}</span>
                  )}
                </h2>
              </div>
              <div className="p-6">
                {requests.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground mb-4">لا توجد طلبات حتى الآن</p>
                    <Link to="/craftsmen">
                      <Button variant="accent" size="sm" className="rounded-xl">ابحث عن حرفي</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {requests.map((req) => {
                      const status = statusMap[req.status] || statusMap.pending;
                      const StatusIcon = status.icon;
                      return (
                        <div key={req.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/20 hover:shadow-card transition-shadow">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                              <StatusIcon className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground text-sm">{req.title}</h4>
                              <p className="text-xs text-muted-foreground mt-0.5">{new Date(req.created_at).toLocaleDateString('ar')}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                            {status.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Incoming Requests (Craftsman) */}
            {isCraftsman && (
              <div className="bg-card rounded-2xl border border-border/40 shadow-card overflow-hidden">
                <div className="px-6 py-5 border-b border-border/30">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent" />
                    الطلبات الواردة
                    {incomingRequests.length > 0 && (
                      <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">{incomingRequests.length}</span>
                    )}
                  </h2>
                </div>
                <div className="p-6">
                  {incomingRequests.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                        <Star className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <p className="text-muted-foreground">لا توجد طلبات واردة</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {incomingRequests.map((req) => {
                        const status = statusMap[req.status] || statusMap.pending;
                        return (
                          <div key={req.id} className="p-5 rounded-xl bg-secondary/30 border border-border/20 hover:shadow-card transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-bold text-foreground text-sm">{req.title}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                                {status.label}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{req.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">{new Date(req.created_at).toLocaleDateString('ar')}</span>
                              <div className="flex gap-2">
                                {req.status === "pending" && (
                                  <>
                                    <Button size="sm" variant="accent" className="rounded-xl" onClick={() => updateRequestStatus(req.id, "accepted")}>
                                      قبول
                                    </Button>
                                    <Button size="sm" variant="outline" className="rounded-xl" onClick={() => updateRequestStatus(req.id, "cancelled")}>
                                      رفض
                                    </Button>
                                  </>
                                )}
                                {req.status === "accepted" && (
                                  <Button size="sm" variant="accent" className="rounded-xl" onClick={() => updateRequestStatus(req.id, "completed")}>
                                    تم الإنجاز
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
