import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("service_categories").select("*").then(({ data }) => {
      if (data) setCategories(data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background font-cairo">
      <Navbar />
      <section className="bg-gradient-to-l from-primary/[0.08] to-primary/[0.03] border-b border-border/50">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-16 md:py-20">
          <span className="inline-block text-accent font-semibold text-sm mb-3">فئات الخدمات</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 font-cairo">تصفح حسب التخصص</h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">اختر التخصص المطلوب وتصفح قائمة الحرفيين المتخصصين فيه</p>
        </div>
      </section>

      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <button key={category.id} onClick={() => navigate(`/craftsmen?category=${category.slug}`)}
              className="bg-card rounded-2xl border border-border/40 shadow-card p-7 text-right hover:shadow-hover hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 group">
              <div className="text-5xl mb-5">{category.icon}</div>
              <h3 className="font-bold text-foreground text-xl mb-2 font-cairo group-hover:text-accent transition-colors">{category.name}</h3>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{category.description}</p>
              <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:-translate-x-1 transition-all" />
            </button>
          ))}
        </div>

        <div className="mt-16 text-center bg-secondary/40 rounded-2xl p-10 border border-border/30">
          <h2 className="text-2xl font-bold text-foreground mb-3 font-cairo">لم تجد تخصصك؟</h2>
          <p className="text-muted-foreground mb-6">إذا كنت حرفياً في تخصص غير مدرج، تواصل معنا لإضافة تخصصك</p>
          <Button variant="accent" onClick={() => navigate("/contact")} className="gap-2">تواصل معنا <ArrowLeft className="w-4 h-4" /></Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
