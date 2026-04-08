import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Users, Target, Heart, Award, Globe, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "45+", label: "حرفي مسجل" },
  { value: "8", label: "تخصص مختلف" },
  { value: "15+", label: "مدينة فلسطينية" },
  { value: "500+", label: "عميل راضٍ" },
];

const values = [
  {
    icon: Shield,
    title: "الموثوقية",
    description: "نضمن أن كل حرفي على منصتنا تم التحقق من هويته وخبرته لتوفير خدمة آمنة وموثوقة.",
  },
  {
    icon: Target,
    title: "الشفافية",
    description: "تقييمات ومراجعات حقيقية من عملاء فعليين تساعدك في اتخاذ القرار الصحيح.",
  },
  {
    icon: Heart,
    title: "دعم المجتمع",
    description: "نساهم في تمكين الحرفيين الفلسطينيين وربطهم بالعملاء لتعزيز الاقتصاد المحلي.",
  },
  {
    icon: Globe,
    title: "التغطية الشاملة",
    description: "نغطي جميع المدن والمناطق الفلسطينية لنكون الدليل الأشمل للحرفيين.",
  },
];

const team = [
  { name: "إسلام مسمار", role: "مؤسس ومصمم المنصة", emoji: "👨‍💻" },
  { name: "فريق التطوير", role: "تطوير وبرمجة", emoji: "⚙️" },
  { name: "فريق الدعم", role: "خدمة العملاء", emoji: "🎧" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background font-cairo">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-l from-primary/[0.08] to-primary/[0.03] border-b border-border/50">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="inline-block text-accent font-semibold text-sm mb-3">من نحن</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 font-cairo leading-tight">
              نربط الحرفيين بالعملاء
              <br />
              <span className="text-accent">بثقة وشفافية</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl">
              PalestinianCrafts هي المنصة الأولى في فلسطين المتخصصة في ربط المواطنين بالحرفيين المحليين. نهدف لتسهيل الوصول لأفضل الخدمات الحرفية مع ضمان الجودة والمصداقية.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border/30">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-card rounded-2xl border border-border/40 shadow-card">
                <div className="text-3xl md:text-4xl font-extrabold text-accent mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-accent font-semibold text-sm mb-3">رؤيتنا</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6 font-cairo">
                بناء جسر الثقة بين الحرفي والعميل
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                نؤمن بأن كل حرفي فلسطيني يستحق فرصة لعرض مهاراته والوصول لعملاء جدد. ونؤمن أن كل مواطن يستحق الوصول لحرفي موثوق بسهولة.
              </p>
              <ul className="space-y-3">
                {[
                  "تسهيل البحث عن الحرفيين حسب التخصص والموقع",
                  "بناء نظام تقييم شفاف يعتمد على تجارب حقيقية",
                  "تمكين الحرفيين من إدارة ملفاتهم الشخصية وأعمالهم",
                  "تغطية جميع المدن والتخصصات الحرفية في فلسطين",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-accent/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <Award className="w-12 h-12 text-accent mb-4" />
                <h3 className="font-bold text-foreground mb-1">جودة مضمونة</h3>
                <p className="text-muted-foreground text-xs">تقييمات وتجارب حقيقية</p>
              </div>
              <div className="bg-primary/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-bold text-foreground mb-1">مجتمع متنامٍ</h3>
                <p className="text-muted-foreground text-xs">حرفيون وعملاء من كل فلسطين</p>
              </div>
              <div className="bg-primary/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center col-span-2">
                <Globe className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-bold text-foreground mb-1">تغطية شاملة</h3>
                <p className="text-muted-foreground text-xs">نغطي جميع المدن الفلسطينية بمختلف التخصصات</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <span className="inline-block text-accent font-semibold text-sm mb-3">قيمنا</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-5 font-cairo">
              ما نؤمن به
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="bg-card rounded-2xl p-7 border border-border/40 shadow-card text-center hover:shadow-card-hover transition-all hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <value.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-3 font-cairo">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <span className="inline-block text-accent font-semibold text-sm mb-3">فريقنا</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-5 font-cairo">
              الفريق خلف المنصة
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="bg-card rounded-2xl p-8 border border-border/40 shadow-card text-center">
                <div className="text-5xl mb-4">{member.emoji}</div>
                <h3 className="font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-5 font-cairo">
            انضم إلى مجتمع PalestinianCrafts
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-2xl mx-auto">
            سواء كنت حرفياً تبحث عن عملاء جدد، أو عميلاً يبحث عن حرفي موثوق – نحن هنا لمساعدتك
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register-craftsman">
              <Button variant="accent" size="lg" className="gap-2 text-base">
                سجّل كحرفي
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/craftsmen">
              <Button variant="outline" size="lg" className="gap-2 text-base border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                تصفح الحرفيين
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
