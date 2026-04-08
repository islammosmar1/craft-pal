import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Upload, User, Briefcase, FileText, ArrowLeft, Star } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

const steps = [
  { id: 1, title: "المعلومات الشخصية", icon: User },
  { id: 2, title: "التخصص والخبرة", icon: Briefcase },
  { id: 3, title: "الوصف والأعمال", icon: FileText },
];

const cities = [
  "القدس", "رام الله", "نابلس", "الخليل", "بيت لحم", "جنين", "طولكرم",
  "قلقيلية", "سلفيت", "أريحا", "طوباس", "غزة", "خان يونس", "رفح", "دير البلح",
];

const RegisterCraftsman = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    specialty: "",
    experience: "",
    description: "",
  });

  useEffect(() => {
    fetchCategories();
    if (user) {
      supabase.from("profiles").select("full_name, phone, city").eq("user_id", user.id).single()
        .then(({ data }) => {
          if (data) {
            setFormData(prev => ({
              ...prev,
              name: data.full_name || "",
              phone: data.phone || "",
              city: data.city || "",
            }));
          }
        });
    }
  }, [user]);

  const fetchCategories = async () => {
    const { data } = await supabase.from("service_categories").select("*");
    if (data) setCategories(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({ title: "يرجى تسجيل الدخول أولاً", variant: "destructive" });
      navigate("/auth");
      return;
    }

    setLoading(true);

    // Update profile
    await supabase.from("profiles").update({
      full_name: formData.name,
      phone: formData.phone,
      city: formData.city,
    }).eq("user_id", user.id);

    // Create craftsman profile
    const selectedCategory = categories.find(c => c.id === formData.specialty);
    const { error } = await supabase.from("craftsman_profiles").insert({
      user_id: user.id,
      category_id: formData.specialty || null,
      specialty_name: selectedCategory?.name || "أخرى",
      experience_years: parseInt(formData.experience) || 0,
      description: formData.description,
      city: formData.city,
      phone: formData.phone,
      address: formData.address || null,
    });

    if (error) {
      if (error.code === "23505") {
        toast({ title: "لديك ملف حرفي مسجل بالفعل", variant: "destructive" });
      } else {
        toast({ title: "حدث خطأ", description: error.message, variant: "destructive" });
      }
    } else {
      // Add craftsman role
      await supabase.from("user_roles").insert({ user_id: user.id, role: "craftsman" as any });
      toast({ title: "تم تسجيلك كحرفي بنجاح! ✅", description: "سيتم مراجعة ملفك والموافقة عليه قريباً" });
      navigate("/dashboard");
    }
    setLoading(false);
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-background font-cairo">
      <Navbar />

      <section className="bg-gradient-to-l from-accent/[0.08] to-accent/[0.03] border-b border-border/50">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-16 md:py-20">
          <span className="inline-block text-accent font-semibold text-sm mb-3">انضم إلينا</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 font-cairo">سجّل كحرفي في المنصة</h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            {user ? "أنشئ ملفك الشخصي واعرض أعمالك لآلاف العملاء" : "سجّل دخولك أولاً ثم أنشئ ملفك كحرفي"}
          </p>
        </div>
      </section>

      {!user ? (
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-16 text-center">
          <p className="text-muted-foreground mb-6">يرجى تسجيل الدخول أو إنشاء حساب للمتابعة</p>
          <Button variant="accent" onClick={() => navigate("/auth")}>تسجيل الدخول</Button>
        </div>
      ) : (
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border/40 shadow-card p-6">
                <h3 className="font-bold text-foreground text-lg mb-4 font-cairo">لماذا تسجّل معنا؟</h3>
                <ul className="space-y-4">
                  {["ملف شخصي احترافي يعرض أعمالك", "الوصول لآلاف العملاء المحتملين", "تقييمات تبني سمعتك المهنية", "ظهور في نتائج البحث حسب التخصص", "تواصل مباشر مع العملاء", "التسجيل مجاني بالكامل"].map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-2xl border border-border/40 shadow-card p-6">
                <h3 className="font-bold text-foreground text-lg mb-4 font-cairo">خطوات التسجيل</h3>
                <div className="space-y-3">
                  {steps.map((step) => (
                    <div key={step.id} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${currentStep === step.id ? "bg-accent/10 text-accent" : currentStep > step.id ? "text-accent/60" : "text-muted-foreground"}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${currentStep === step.id ? "bg-accent text-accent-foreground" : currentStep > step.id ? "bg-accent/20 text-accent" : "bg-secondary text-muted-foreground"}`}>
                        {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : step.id}
                      </div>
                      <span className="text-sm font-medium">{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="bg-card rounded-2xl border border-border/40 shadow-card p-8 md:p-10">
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-1 font-cairo">المعلومات الشخصية</h2>
                        <p className="text-muted-foreground text-sm">أدخل بياناتك الأساسية</p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">الاسم الكامل *</label>
                          <Input name="name" value={formData.name} onChange={handleChange} placeholder="مثال: أحمد محمد" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">رقم الهاتف *</label>
                          <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+970 xxx xxx xxxx" dir="ltr" required />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">المدينة *</label>
                          <select name="city" value={formData.city} onChange={handleChange} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" required>
                            <option value="">اختر المدينة</option>
                            {cities.map((city) => <option key={city} value={city}>{city}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">العنوان التفصيلي</label>
                          <Input name="address" value={formData.address} onChange={handleChange} placeholder="الحي أو المنطقة" />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-1 font-cairo">التخصص والخبرة</h2>
                        <p className="text-muted-foreground text-sm">حدد تخصصك وسنوات خبرتك</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">التخصص *</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {categories.map((cat) => (
                            <button key={cat.id} type="button" onClick={() => setFormData({ ...formData, specialty: cat.id })}
                              className={`p-4 rounded-xl border text-center transition-all ${formData.specialty === cat.id ? "border-accent bg-accent/10 text-accent shadow-sm" : "border-border/40 bg-secondary/30 text-muted-foreground hover:border-accent/40"}`}>
                              <span className="text-2xl block mb-1">{cat.icon}</span>
                              <span className="text-xs font-medium">{cat.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">سنوات الخبرة *</label>
                        <Input name="experience" type="number" min="0" max="50" value={formData.experience} onChange={handleChange} placeholder="مثال: 10" required />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-1 font-cairo">الوصف والأعمال</h2>
                        <p className="text-muted-foreground text-sm">أخبر العملاء المزيد عن خدماتك</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">وصف الخدمات *</label>
                        <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="اكتب وصفاً مفصلاً عن خدماتك..." rows={5} required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">صور الأعمال السابقة</label>
                        <div className="border-2 border-dashed border-border rounded-2xl p-10 text-center hover:border-accent/40 transition-colors cursor-pointer">
                          <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                          <p className="text-muted-foreground text-sm mb-1">اسحب الصور هنا أو اضغط للاختيار</p>
                          <p className="text-muted-foreground/60 text-xs">PNG, JPG حتى 5MB لكل صورة</p>
                        </div>
                      </div>

                      <div className="bg-secondary/40 rounded-2xl p-6 border border-border/30">
                        <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                          <Star className="w-4 h-4 text-accent" />
                          معاينة الملف الشخصي
                        </h3>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-muted-foreground">الاسم:</span> <span className="text-foreground font-medium">{formData.name || "—"}</span></p>
                          <p><span className="text-muted-foreground">الهاتف:</span> <span className="text-foreground font-medium" dir="ltr">{formData.phone || "—"}</span></p>
                          <p><span className="text-muted-foreground">المدينة:</span> <span className="text-foreground font-medium">{formData.city || "—"}</span></p>
                          <p><span className="text-muted-foreground">التخصص:</span> <span className="text-foreground font-medium">{categories.find(c => c.id === formData.specialty)?.name || "—"}</span></p>
                          <p><span className="text-muted-foreground">الخبرة:</span> <span className="text-foreground font-medium">{formData.experience ? `${formData.experience} سنوات` : "—"}</span></p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/30">
                    {currentStep > 1 ? (
                      <Button type="button" variant="outline" onClick={prevStep} className="gap-2">
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                        السابق
                      </Button>
                    ) : <div />}
                    {currentStep < 3 ? (
                      <Button type="button" variant="accent" onClick={nextStep} className="gap-2">
                        التالي
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button type="submit" variant="accent" size="lg" className="gap-2" disabled={loading}>
                        <CheckCircle className="w-4 h-4" />
                        {loading ? "جاري التسجيل..." : "إرسال طلب التسجيل"}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default RegisterCraftsman;
