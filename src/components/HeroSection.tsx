import { Search, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-craftsman.jpg";
import { supabase } from "@/integrations/supabase/client";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.from("service_categories").select("*").limit(5).then(({ data }) => {
      if (data) setCategories(data);
    });
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (location) params.set("city", location);
    navigate(`/craftsmen?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden min-h-[620px] lg:min-h-[720px] flex items-center">
      <div className="absolute inset-0">
        <img src={heroImage} alt="حرفي فلسطيني محترف" className="w-full h-full object-cover scale-105" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-l from-[hsl(220,50%,12%)] via-[hsl(220,45%,16%/0.92)] to-[hsl(220,40%,20%/0.82)]" />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2.5 bg-white/10 text-white/90 px-5 py-2.5 rounded-full text-sm font-medium mb-10 backdrop-blur-md border border-white/10">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            دليل الحرفيين الفلسطينيين
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4.25rem] font-extrabold text-white leading-[1.12] mb-8 font-cairo tracking-tight">
            ابحث عن أفضل
            <br />
            <span className="text-gradient">الحرفيين</span> بالقرب منك
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-14 leading-relaxed max-w-xl">
            دليلك الشامل للعثور على حرفيين موثوقين في فلسطين.
            <br className="hidden md:block" />
            دهان، كهرباء، سباكة، بلاط وغيرها الكثير.
          </p>

          <div className="bg-white rounded-2xl p-2 shadow-elevated flex flex-col md:flex-row gap-1.5 max-w-2xl">
            <div className="flex-1 flex items-center gap-3 bg-secondary/60 rounded-xl px-4 py-3.5 transition-colors focus-within:bg-secondary">
              <Search className="w-4.5 h-4.5 text-muted-foreground shrink-0" />
              <input type="text" placeholder="ابحث عن خدمة (دهان، كهرباء...)" className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
            </div>
            <div className="flex-1 flex items-center gap-3 bg-secondary/60 rounded-xl px-4 py-3.5 transition-colors focus-within:bg-secondary">
              <MapPin className="w-4.5 h-4.5 text-muted-foreground shrink-0" />
              <input type="text" placeholder="الموقع (رام الله، نابلس...)" className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm" value={location} onChange={(e) => setLocation(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
            </div>
            <Button variant="hero" size="lg" className="rounded-xl px-10 min-h-[48px] shadow-md" onClick={handleSearch}>بحث</Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-8">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => navigate(`/craftsmen?category=${cat.slug}`)}
                className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/15 text-white/80 hover:text-white px-4 py-2 rounded-full text-sm transition-all duration-200 backdrop-blur-sm border border-white/8 hover:border-white/15">
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>

          <div className="flex gap-12 mt-16">
            {[
              { value: "500+", label: "حرفي مسجّل" },
              { value: "2,000+", label: "عميل راضٍ" },
              { value: "8", label: "تخصصات" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-accent mb-1">{stat.value}</div>
                <div className="text-sm text-white/45">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="w-5 h-5 text-white/25 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
