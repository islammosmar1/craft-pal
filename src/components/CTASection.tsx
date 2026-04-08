import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus, Search } from "lucide-react";

const CTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(160deg, hsl(220 50% 14%) 0%, hsl(220 42% 22%) 50%, hsl(220 38% 28%) 100%)" }}>
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-white mb-6 font-cairo leading-tight">
              هل أنت حرفي؟
              <br />
              <span className="text-gradient">انضم إلينا اليوم</span>
            </h2>
            <p className="text-white/55 text-lg mb-10 leading-relaxed max-w-lg">
              أنشئ ملفك الشخصي مجاناً واعرض أعمالك لآلاف العملاء المحتملين في جميع أنحاء فلسطين. التسجيل سهل ولا يستغرق سوى دقائق.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/register-craftsman">
                <Button variant="accent" size="lg" className="gap-2 text-base rounded-xl shadow-md">
                  <UserPlus className="w-5 h-5" />
                  سجّل كحرفي مجاناً
                </Button>
              </Link>
              <Link to="/craftsmen">
                <Button variant="outline" size="lg" className="gap-2 text-base rounded-xl border-white/15 text-white hover:bg-white/10">
                  <Search className="w-5 h-5" />
                  تصفح الحرفيين
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "مجاني", label: "التسجيل بالكامل", emoji: "💰" },
              { value: "دقائق", label: "لإنشاء ملفك", emoji: "⏱️" },
              { value: "آلاف", label: "عملاء محتملين", emoji: "👥" },
              { value: "فلسطين", label: "تغطية شاملة", emoji: "🗺️" },
            ].map((item) => (
              <div key={item.label} className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-6 text-center border border-white/[0.08] hover:bg-white/[0.1] transition-colors duration-300">
                <span className="text-3xl block mb-3">{item.emoji}</span>
                <div className="text-xl font-extrabold text-accent mb-1">{item.value}</div>
                <div className="text-white/45 text-xs">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
