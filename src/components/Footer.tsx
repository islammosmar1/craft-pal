import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white py-16" style={{ background: "hsl(220 50% 12%)" }}>
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-extrabold text-xl">P</span>
              </div>
              <span className="text-xl font-extrabold font-cairo">
                Palestinian<span className="text-accent">Crafts</span>
              </span>
            </div>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              دليل الحرفيين الفلسطينيين – منصة تربط المواطنين بأفضل الحرفيين المحليين بسهولة وشفافية ومصداقية.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-5 font-cairo text-base">روابط سريعة</h4>
            <div className="space-y-3">
              {[
                { label: "الرئيسية", to: "/" },
                { label: "الحرفيون", to: "/craftsmen" },
                { label: "فئات الخدمات", to: "/categories" },
                { label: "من نحن", to: "/about" },
                { label: "اتصل بنا", to: "/contact" },
                { label: "سجّل كحرفي", to: "/register-craftsman" },
              ].map((link) => (
                <Link key={link.label} to={link.to} className="block text-white/45 hover:text-accent text-sm transition-colors duration-200">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-5 font-cairo text-base">الخدمات</h4>
            <div className="space-y-3">
              {[
                { label: "دهان", id: "painting" },
                { label: "كهرباء", id: "electricity" },
                { label: "سباكة", id: "plumbing" },
                { label: "بلاط", id: "tiles" },
                { label: "نجارة", id: "carpentry" },
                { label: "بناء", id: "construction" },
                { label: "تمديدات", id: "wiring" },
                { label: "تكييف وتبريد", id: "ac" },
              ].map((s) => (
                <Link key={s.id} to={`/craftsmen?category=${s.id}`} className="block text-white/45 hover:text-accent text-sm transition-colors duration-200">
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-5 font-cairo text-base">تواصل معنا</h4>
            <div className="space-y-3 text-white/45 text-sm">
              <p>فلسطين - رام الله</p>
              <p dir="ltr" className="text-start">info@palestiniancrafts.ps</p>
              <p dir="ltr" className="text-start">+970 2 xxx xxxx</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © 2024 PalestinianCrafts – تصميم إسلام مسمار. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-5 text-white/30 text-sm">
            <Link to="/privacy" className="hover:text-accent transition-colors duration-200">سياسة الخصوصية</Link>
            <Link to="/terms" className="hover:text-accent transition-colors duration-200">شروط الاستخدام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
