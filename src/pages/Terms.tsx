import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => (
  <div className="min-h-screen bg-background font-cairo">
    <Navbar />
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-16 md:py-20">
      <h1 className="text-4xl font-extrabold text-foreground mb-8 font-cairo">شروط الاستخدام</h1>
      <div className="prose prose-lg max-w-3xl space-y-6 text-foreground/80">
        <p>آخر تحديث: يناير 2024</p>
        <h2 className="text-2xl font-bold text-foreground">1. شروط عامة</h2>
        <p>باستخدامك لمنصة PalestinianCrafts، فإنك توافق على الالتزام بهذه الشروط والأحكام.</p>
        <h2 className="text-2xl font-bold text-foreground">2. تسجيل الحرفيين</h2>
        <p>يتحمل الحرفي المسجل مسؤولية دقة المعلومات المقدمة. يحق للمنصة رفض أو إزالة أي ملف يحتوي على معلومات مضللة.</p>
        <h2 className="text-2xl font-bold text-foreground">3. التقييمات والمراجعات</h2>
        <p>يجب أن تكون التقييمات صادقة ومبنية على تجارب فعلية. يحق للمنصة إزالة التقييمات المسيئة أو المزيفة.</p>
        <h2 className="text-2xl font-bold text-foreground">4. المسؤولية</h2>
        <p>المنصة تعمل كوسيط لربط العملاء بالحرفيين ولا تتحمل مسؤولية جودة الخدمات المقدمة من الحرفيين.</p>
      </div>
    </div>
    <Footer />
  </div>
);

export default Terms;
