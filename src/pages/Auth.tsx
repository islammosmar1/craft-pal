import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Sparkles } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: "خطأ في تسجيل الدخول", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "مرحباً بك! 👋" });
        navigate("/");
      }
    } else {
      if (!fullName.trim()) {
        toast({ title: "يرجى إدخال الاسم الكامل", variant: "destructive" });
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast({ title: "خطأ في إنشاء الحساب", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "تم إنشاء الحساب بنجاح! ✅", description: "يرجى تفقد بريدك الإلكتروني لتأكيد الحساب" });
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background font-cairo flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(24_90%_55%/0.15),transparent_60%)]" />
        <div className="relative z-10 flex flex-col justify-center px-16 text-primary-foreground">
          <div className="w-14 h-14 rounded-2xl bg-accent/20 backdrop-blur-sm flex items-center justify-center mb-8">
            <Sparkles className="w-7 h-7 text-accent" />
          </div>
          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            مرحباً بك في
            <br />
            <span className="text-accent">Palestinian</span>Crafts
          </h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-md">
            منصتك الأولى للوصول إلى أفضل الحرفيين الفلسطينيين. جودة عالية وخدمة موثوقة.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { num: "+500", label: "حرفي مسجل" },
              { num: "+1000", label: "خدمة مكتملة" },
              { num: "4.8", label: "تقييم عام" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-extrabold text-accent">{s.num}</div>
                <div className="text-xs text-primary-foreground/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent/5" />
        <div className="absolute top-20 -right-10 w-40 h-40 rounded-full bg-accent/5" />
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md animate-fade-in">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4 rotate-180" />
            العودة للرئيسية
          </Link>

          <div className="mb-8">
            <div className="lg:hidden w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-5">
              <span className="text-accent-foreground font-extrabold text-xl">P</span>
            </div>
            <h1 className="text-3xl font-extrabold text-foreground font-cairo">
              {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isLogin ? "أدخل بياناتك للوصول لحسابك" : "أنشئ حساباً جديداً للبدء"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">الاسم الكامل</label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="أدخل اسمك الكامل"
                    className="pr-10 h-12 rounded-xl bg-secondary/50 border-border/60 focus:bg-card transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="pr-10 h-12 rounded-xl bg-secondary/50 border-border/60 focus:bg-card transition-colors"
                  dir="ltr"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-10 pl-10 h-12 rounded-xl bg-secondary/50 border-border/60 focus:bg-card transition-colors"
                  dir="ltr"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="accent" className="w-full h-12 rounded-xl text-base font-bold mt-2" disabled={loading}>
              {loading ? "جاري التحميل..." : isLogin ? "تسجيل الدخول" : "إنشاء الحساب"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-4 text-xs text-muted-foreground">أو</span>
              </div>
            </div>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-accent hover:text-accent/80 font-medium transition-colors"
            >
              {isLogin ? "ليس لديك حساب؟ أنشئ حساباً جديداً" : "لديك حساب بالفعل؟ سجّل الدخول"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
