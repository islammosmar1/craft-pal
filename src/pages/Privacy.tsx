import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => (
  <div className="min-h-screen bg-background font-cairo">
    <Navbar />
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-16 md:py-20">
      <h1 className="text-4xl font-extrabold text-foreground mb-8 font-cairo">سياسة الخصوصية</h1>
      <div className="prose prose-lg max-w-3xl space-y-6 text-foreground/80">
        <p>آخر تحديث: يناير 2024</p>
        <h2 className="text-2xl font-bold text-foreground">1. المعلومات التي نجمعها</h2>
        <p>نقوم بجمع المعلومات التالية عند استخدامك للمنصة: الاسم، رقم الهاتف، الموقع الجغرافي، والتخصص المهني (للحرفيين).</p>
        <h2 className="text-2xl font-bold text-foreground">2. استخدام المعلومات</h2>
        <p>نستخدم المعلومات المجمعة لعرض ملفات الحرفيين، تسهيل التواصل بين العملاء والحرفيين، وتحسين خدمات المنصة.</p>
        <h2 className="text-2xl font-bold text-foreground">3. حماية المعلومات</h2>
        <p>نلتزم بحماية بياناتك الشخصية ولا نشاركها مع أطراف ثالثة دون موافقتك.</p>
        <h2 className="text-2xl font-bold text-foreground">4. التواصل</h2>
        <p>لأي استفسارات حول سياسة الخصوصية، يرجى التواصل معنا عبر صفحة اتصل بنا.</p>
      </div>
    </div>
    <Footer />
  </div>
);

export default Privacy;
