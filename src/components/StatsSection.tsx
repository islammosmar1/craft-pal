import { useState, useEffect } from "react";
import { Users, MapPin, Star, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const StatsSection = () => {
  const [stats, setStats] = useState({ craftsmen: 0, categories: 0, cities: 0, avgRating: "0" });

  useEffect(() => {
    Promise.all([
      supabase.from("craftsman_profiles").select("city, rating", { count: "exact" }),
      supabase.from("service_categories").select("id", { count: "exact" }),
    ]).then(([craftsmenRes, categoriesRes]) => {
      const data = craftsmenRes.data || [];
      const citiesSet = new Set(data.map((c: any) => c.city));
      const avg = data.length ? (data.reduce((s: number, c: any) => s + Number(c.rating), 0) / data.length).toFixed(1) : "0";
      setStats({
        craftsmen: craftsmenRes.count || 0,
        categories: categoriesRes.count || 0,
        cities: citiesSet.size,
        avgRating: avg,
      });
    });
  }, []);

  const items = [
    { icon: Users, value: `${stats.craftsmen}+`, label: "حرفي مسجل" },
    { icon: Briefcase, value: stats.categories.toString(), label: "تخصص مختلف" },
    { icon: MapPin, value: `${stats.cities}+`, label: "مدينة فلسطينية" },
    { icon: Star, value: stats.avgRating, label: "متوسط التقييم" },
  ];

  return (
    <section className="relative z-10 -mt-12 pb-8">
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
          {items.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl p-6 lg:p-7 border border-border/60 shadow-card hover:shadow-card-hover transition-all duration-300 text-center group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-11 h-11 rounded-xl bg-accent/8 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/12 transition-colors">
                <stat.icon className="w-5 h-5 text-accent" />
              </div>
              <div className="text-2xl lg:text-3xl font-extrabold text-foreground mb-0.5 font-cairo">{stat.value}</div>
              <div className="text-muted-foreground text-xs font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
