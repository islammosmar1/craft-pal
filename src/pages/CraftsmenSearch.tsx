import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, MapPin, Star, SlidersHorizontal, X, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import CraftsmanCard from "@/components/CraftsmanCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CraftsmanResult {
  id: string;
  specialty_name: string;
  city: string;
  phone: string;
  description: string | null;
  experience_years: number;
  available: boolean;
  rating: number;
  review_count: number;
  profiles: { full_name: string } | null;
  service_categories: { name: string; icon: string; slug: string } | null;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

const cities = [
  "القدس", "رام الله", "نابلس", "الخليل", "بيت لحم", "جنين", "طولكرم",
  "قلقيلية", "سلفيت", "أريحا", "طوباس", "غزة", "خان يونس", "رفح", "دير البلح",
];

const CraftsmenSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(true);
  const [craftsmen, setCraftsmen] = useState<CraftsmanResult[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const initialCategory = searchParams.get("category") || "";
  const initialQuery = searchParams.get("q") || "";
  const initialCity = searchParams.get("city") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "experience">("rating");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [{ data: craftsmenData }, { data: categoriesData }] = await Promise.all([
      supabase.from("craftsman_profiles").select("*, profiles!craftsman_profiles_user_id_profiles_fkey(full_name), service_categories(name, icon, slug)"),
      supabase.from("service_categories").select("*"),
    ]);
    if (craftsmenData) setCraftsmen(craftsmenData as unknown as CraftsmanResult[]);
    if (categoriesData) setCategories(categoriesData);
    setLoading(false);
  };

  const filteredCraftsmen = useMemo(() => {
    let results = [...craftsmen];

    if (selectedCategory) {
      results = results.filter((c) => c.service_categories?.slug === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter((c) =>
        (c.profiles?.full_name || "").includes(q) ||
        c.specialty_name.includes(q) ||
        (c.description || "").includes(q) ||
        c.city.includes(q)
      );
    }
    if (selectedCity) {
      results = results.filter((c) => c.city === selectedCity);
    }
    if (minRating > 0) {
      results = results.filter((c) => Number(c.rating) >= minRating);
    }

    results.sort((a, b) => {
      if (sortBy === "rating") return Number(b.rating) - Number(a.rating);
      if (sortBy === "reviews") return b.review_count - a.review_count;
      return b.experience_years - a.experience_years;
    });

    return results;
  }, [craftsmen, selectedCategory, searchQuery, selectedCity, minRating, sortBy]);

  const activeCategory = categories.find((c) => c.slug === selectedCategory);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedCity("");
    setMinRating(0);
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedCity || minRating > 0;

  return (
    <div className="min-h-screen bg-background font-cairo">
      <Navbar />

      <div className="bg-gradient-to-l from-primary/[0.06] to-primary/[0.02] border-b border-border/50">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-accent transition-colors">الرئيسية</Link>
            <ArrowRight className="w-3 h-3 rotate-180" />
            <span className="text-foreground">{activeCategory ? activeCategory.name : "جميع الحرفيين"}</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground font-cairo flex items-center gap-3">
                {activeCategory && <span className="text-4xl">{activeCategory.icon}</span>}
                {activeCategory ? `حرفيو ${activeCategory.name}` : "جميع الحرفيين"}
              </h1>
              <p className="text-muted-foreground mt-2">{filteredCraftsmen.length} حرفي متاح</p>
            </div>
            <div className="flex gap-2 max-w-lg w-full lg:w-auto">
              <div className="flex-1 flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3 shadow-sm">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input type="text" placeholder="ابحث بالاسم أو التخصص..." className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                {searchQuery && <button onClick={() => setSearchQuery("")}><X className="w-4 h-4 text-muted-foreground hover:text-foreground" /></button>}
              </div>
              <Button variant={showFilters ? "accent" : "outline"} size="icon" className="rounded-xl shrink-0 w-12 h-12" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {showFilters && (
            <aside className="lg:w-72 shrink-0 space-y-6">
              <div className="bg-card rounded-2xl border border-border/40 shadow-card p-6">
                <h3 className="font-bold text-foreground mb-4 font-cairo">التخصص</h3>
                <div className="space-y-1.5">
                  <button onClick={() => setSelectedCategory("")} className={`w-full text-right px-3 py-2.5 rounded-xl text-sm transition-colors ${!selectedCategory ? "bg-accent/10 text-accent font-medium" : "text-muted-foreground hover:bg-secondary"}`}>الكل</button>
                  {categories.map((cat) => (
                    <button key={cat.id} onClick={() => setSelectedCategory(selectedCategory === cat.slug ? "" : cat.slug)} className={`w-full text-right px-3 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2 ${selectedCategory === cat.slug ? "bg-accent/10 text-accent font-medium" : "text-muted-foreground hover:bg-secondary"}`}>
                      <span>{cat.icon}</span> {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border/40 shadow-card p-6">
                <h3 className="font-bold text-foreground mb-4 font-cairo">المدينة</h3>
                <div className="space-y-1.5 max-h-64 overflow-y-auto">
                  <button onClick={() => setSelectedCity("")} className={`w-full text-right px-3 py-2.5 rounded-xl text-sm transition-colors ${!selectedCity ? "bg-accent/10 text-accent font-medium" : "text-muted-foreground hover:bg-secondary"}`}>جميع المدن</button>
                  {cities.map((city) => (
                    <button key={city} onClick={() => setSelectedCity(selectedCity === city ? "" : city)} className={`w-full text-right px-3 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2 ${selectedCity === city ? "bg-accent/10 text-accent font-medium" : "text-muted-foreground hover:bg-secondary"}`}>
                      <MapPin className="w-3 h-3" /> {city}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border/40 shadow-card p-6">
                <h3 className="font-bold text-foreground mb-4 font-cairo">الحد الأدنى للتقييم</h3>
                <div className="space-y-1.5">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <button key={rating} onClick={() => setMinRating(rating)} className={`w-full text-right px-3 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2 ${minRating === rating ? "bg-accent/10 text-accent font-medium" : "text-muted-foreground hover:bg-secondary"}`}>
                      {rating === 0 ? "الكل" : <><Star className="w-3.5 h-3.5 fill-accent text-accent" />{rating}+ فما فوق</>}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <Button variant="outline" className="w-full gap-2" onClick={clearFilters}>
                  <X className="w-4 h-4" /> مسح جميع الفلاتر
                </Button>
              )}
            </aside>
          )}

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{filteredCraftsmen.length} نتيجة</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">ترتيب حسب:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="bg-card border border-border rounded-xl px-3 py-2 text-sm text-foreground outline-none cursor-pointer">
                  <option value="rating">التقييم</option>
                  <option value="reviews">عدد التقييمات</option>
                  <option value="experience">سنوات الخبرة</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20"><p className="text-muted-foreground">جاري التحميل...</p></div>
            ) : filteredCraftsmen.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCraftsmen.map((c) => (
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
            ) : (
              <div className="text-center py-20 bg-card rounded-2xl border border-border/40">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-foreground mb-2">لم يتم العثور على نتائج</h3>
                <p className="text-muted-foreground mb-6">جرّب تغيير معايير البحث أو الفلاتر</p>
                <Button variant="accent" onClick={clearFilters}>مسح الفلاتر</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CraftsmenSearch;
