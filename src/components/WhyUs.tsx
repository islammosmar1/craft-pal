import { Shield, Star, MapPin, Clock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "حرفيون موثوقون",
    description: "جميع الحرفيين يتم التحقق منهم وتقييمهم من قبل عملاء حقيقيين لضمان جودة الخدمة.",
    gradient: "from-blue-500/10 to-indigo-500/10",
  },
  {
    icon: Star,
    title: "تقييمات حقيقية",
    description: "اطّلع على آراء العملاء السابقين واختر الحرفي الأنسب بناءً على تجارب حقيقية.",
    gradient: "from-amber-500/10 to-orange-500/10",
  },
  {
    icon: MapPin,
    title: "قريب منك",
    description: "ابحث عن الحرفيين الأقرب لموقعك لخدمة أسرع وتواصل أسهل.",
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    icon: Clock,
    title: "خدمة سريعة",
    description: "تواصل مباشر مع الحرفي عبر الهاتف أو واتساب للحصول على خدمة فورية.",
    gradient: "from-violet-500/10 to-purple-500/10",
  },
];

const WhyUs = () => {
  return (
    <section className="section-padding bg-background">
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="inline-block text-accent font-semibold text-sm mb-3 tracking-wide">لماذا نحن؟</span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-foreground mb-5 font-cairo">
            ما يميز PalestinianCrafts
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            منصة مصممة لتسهيل الوصول لأفضل الحرفيين في فلسطين
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-7 border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-accent/8 flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/12 group-hover:scale-105 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-3 font-cairo">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
