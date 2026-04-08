import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Users, Grid3X3, Phone, Menu, X, Search, Info, UserPlus, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBell from "@/components/NotificationBell";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, loading } = useAuth();

  const navLinks = [
    { to: "/", label: "الرئيسية", icon: Home },
    { to: "/craftsmen", label: "الحرفيون", icon: Users },
    { to: "/categories", label: "فئات الخدمات", icon: Grid3X3 },
    { to: "/about", label: "من نحن", icon: Info },
    { to: "/contact", label: "اتصل بنا", icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/85 backdrop-blur-2xl border-b border-border/40">
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[68px]">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center group-hover:shadow-md transition-shadow">
              <span className="text-accent-foreground font-extrabold text-lg">P</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-foreground font-cairo leading-tight tracking-tight">
                Palestinian<span className="text-accent">Crafts</span>
              </span>
              <span className="text-[9px] text-muted-foreground leading-none">دليل الحرفيين الفلسطينيين</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                }`}
              >
                <link.icon className="w-3.5 h-3.5" />
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            <Link to="/craftsmen">
              <Button variant="ghost" size="sm" className="gap-1.5 text-[13px] rounded-xl">
                <Search className="w-3.5 h-3.5" />
                ابحث عن حرفي
              </Button>
            </Link>
            {!loading && (
              user ? (
                <>
                  <NotificationBell />
                  <Link to="/dashboard">
                    <Button variant="ghost" size="sm" className="gap-1.5 text-[13px] rounded-xl">
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      لوحة التحكم
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="gap-1.5 text-[13px] rounded-xl" onClick={signOut}>
                    <LogOut className="w-3.5 h-3.5" />
                    خروج
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="ghost" size="sm" className="gap-1.5 text-[13px] rounded-xl">
                      <LogIn className="w-3.5 h-3.5" />
                      دخول
                    </Button>
                  </Link>
                  <Link to="/register-craftsman">
                    <Button variant="accent" size="sm" className="gap-1.5 text-[13px] rounded-xl shadow-sm">
                      <UserPlus className="w-3.5 h-3.5" />
                      سجّل كحرفي
                    </Button>
                  </Link>
                </>
              )
            )}
          </div>

          <button
            className="lg:hidden p-2 text-foreground rounded-xl hover:bg-secondary/70 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden pb-5 border-t border-border/40 mt-1 pt-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors mb-0.5 ${
                  isActive(link.to)
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-4 px-4">
              {user ? (
                <>
                  <Link to="/dashboard" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button variant="accent" size="sm" className="w-full gap-2 rounded-xl">
                      <LayoutDashboard className="w-4 h-4" />
                      لوحة التحكم
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="gap-2 rounded-xl" onClick={() => { signOut(); setIsOpen(false); }}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full gap-2 rounded-xl">
                      <LogIn className="w-4 h-4" />
                      دخول
                    </Button>
                  </Link>
                  <Link to="/register-craftsman" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button variant="accent" size="sm" className="w-full gap-2 rounded-xl">
                      <UserPlus className="w-4 h-4" />
                      سجّل كحرفي
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
