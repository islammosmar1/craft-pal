import { useState, useEffect } from "react";
import CraftsmanCard from "@/components/CraftsmanCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const FeaturedCraftsmen = () => {
  const [featured, setFeatured] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("craftsman_profiles")
      .select("*, profiles!craftsman_profiles_user_id_profiles_fkey(full_name), service_categories(name, icon, slug)")
      .eq("approval_status", "approved")
      .order("rating", { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (data) setFeatured(data);
      });
  }, []);

  if (featured.length === 0) return null;

  return (
    <section className="section-padding bg-secondary/40">
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="inline-block text-accent font-semibold text-sm mb-3 tracking-wide">الأعلى تقييماً</span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-foreground mb-4 font-cairo">أبرز الحرفيين</h2>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">حرفيون مميزون حصلوا على أعلى التقييمات</p>
          </div>
          <Link to="/craftsmen">
            <Button variant="outline" className="gap-2 rounded-xl">عرض جميع الحرفيين <ArrowLeft className="w-4 h-4" /></Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {featured.map((c: any) => (
            <CraftsmanCard key={c.id} craftsman={{
              id: c.id,
              name: c.profiles?.full_name || "حرفي",
              specialty: c.service_categories?.name || c.specialty_name,
              specialtyIcon: c.service_categories?.icon || "🔧",
              location: c.city,
              rating: Number(c.rating),
              reviewCount: c.review_count,
              experience: c.experience_years,
              available: c.available,
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCraftsmen;
