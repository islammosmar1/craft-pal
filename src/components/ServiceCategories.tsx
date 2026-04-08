import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  description: string | null;
}

const ServiceCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    supabase.from("service_categories").select("*").then(({ data }) => {
      if (data) setCategories(data);
    });
  }, []);

  return (
    <section className="section-padding bg-background">
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="inline-block text-accent font-semibold text-sm mb-3 tracking-wide">خدماتنا</span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-foreground mb-5 font-cairo">فئات الخدمات</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">اختر نوع الخدمة التي تبحث عنها وتصفّح الحرفيين المتخصصين</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {categories.map((category, index) => (
            <button key={category.id} onClick={() => navigate(`/craftsmen?category=${category.slug}`)}
              className="group bg-card rounded-2xl p-6 lg:p-7 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-right border border-border/50 hover:border-accent/25 relative overflow-hidden"
              style={{ animationDelay: `${index * 0.04}s` }}>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{category.icon}</div>
                <h3 className="font-bold text-foreground text-base mb-1.5 font-cairo">{category.name}</h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed line-clamp-2">{category.description}</p>
                <div className="flex items-center gap-1 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-xs font-medium">تصفّح</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
