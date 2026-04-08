import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Facebook, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Phone, label: "الهاتف", value: "+970 2 xxx xxxx", dir: "ltr" },
  { icon: Mail, label: "البريد الإلكتروني", value: "info@palestiniancrafts.ps", dir: "ltr" },
  { icon: MapPin, label: "العنوان", value: "فلسطين - رام الله", dir: "rtl" },
  { icon: Clock, label: "ساعات العمل", value: "السبت - الخميس: 8 صباحاً - 6 مساءً", dir: "rtl" },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "تم إرسال رسالتك بنجاح ✅",
        description: "سنقوم بالرد عليك في أقرب وقت ممكن",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background font-cairo">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-l from-primary/[0.08] to-primary/[0.03] border-b border-border/50">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-16 md:py-20">
          <span className="inline-block text-accent font-semibold text-sm mb-3">تواصل معنا</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 font-cairo">
            نحن هنا لمساعدتك
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            لديك سؤال أو اقتراح؟ تواصل معنا وسنرد عليك في أقرب وقت ممكن
          </p>
        </div>
      </section>

      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2 font-cairo">معلومات التواصل</h2>
              <p className="text-muted-foreground text-sm">يمكنك التواصل معنا عبر أي من الطرق التالية</p>
            </div>

            {contactInfo.map((info) => (
              <div key={info.label} className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border/40 shadow-card">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <info.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{info.label}</h3>
                  <p className="text-muted-foreground text-sm" dir={info.dir}>{info.value}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="p-5 bg-card rounded-2xl border border-border/40 shadow-card">
              <h3 className="font-semibold text-foreground text-sm mb-4">تابعنا على</h3>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: "Facebook", color: "bg-blue-500/10 text-blue-600" },
                  { icon: Instagram, label: "Instagram", color: "bg-pink-500/10 text-pink-600" },
                  { icon: MessageCircle, label: "WhatsApp", color: "bg-green-500/10 text-green-600" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className={`w-11 h-11 rounded-xl ${social.color} flex items-center justify-center hover:opacity-80 transition-opacity`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border/40 shadow-card p-8 md:p-10">
              <h2 className="text-2xl font-bold text-foreground mb-2 font-cairo">أرسل لنا رسالة</h2>
              <p className="text-muted-foreground text-sm mb-8">املأ النموذج التالي وسنتواصل معك قريباً</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">الاسم الكامل *</label>
                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="أدخل اسمك" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">البريد الإلكتروني *</label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="example@email.com" dir="ltr" required />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">رقم الهاتف</label>
                    <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+970 xxx xxx xxxx" dir="ltr" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">الموضوع *</label>
                    <Input name="subject" value={formData.subject} onChange={handleChange} placeholder="موضوع الرسالة" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">الرسالة *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="اكتب رسالتك هنا..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" variant="accent" size="lg" className="gap-2 w-full sm:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? "جاري الإرسال..." : (
                    <>
                      <Send className="w-4 h-4" />
                      إرسال الرسالة
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-16 md:mt-20">
          <div className="text-center mb-10">
            <span className="inline-block text-accent font-semibold text-sm mb-3">أسئلة شائعة</span>
            <h2 className="text-3xl font-extrabold text-foreground font-cairo">الأسئلة الأكثر شيوعاً</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { q: "كيف يمكنني تسجيل حرفي جديد؟", a: "يمكنك التسجيل من خلال صفحة 'سجّل كحرفي' وملء النموذج بالمعلومات المطلوبة وصور أعمالك السابقة." },
              { q: "هل الخدمة مجانية؟", a: "نعم، التصفح والبحث عن الحرفيين مجاني تماماً للعملاء. والتسجيل كحرفي مجاني أيضاً." },
              { q: "كيف يتم التحقق من الحرفيين؟", a: "نقوم بمراجعة كل طلب تسجيل والتحقق من المعلومات المقدمة وصور الأعمال قبل نشر الملف." },
              { q: "هل يمكنني تقييم حرفي بعد الخدمة؟", a: "بالتأكيد! يمكنك ترك تقييم ومراجعة على صفحة الحرفي بعد الحصول على الخدمة." },
            ].map((faq, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border/40 shadow-card">
                <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
