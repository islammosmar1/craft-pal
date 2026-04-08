import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ServiceRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  craftsmanId: string;
  craftsmanName: string;
}

const ServiceRequestDialog = ({ open, onOpenChange, craftsmanId, craftsmanName }: ServiceRequestDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({ title: "يرجى تسجيل الدخول أولاً", variant: "destructive" });
      navigate("/auth");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("service_requests").insert({
      user_id: user.id,
      craftsman_id: craftsmanId,
      title: title.trim(),
      description: description.trim(),
      location: location.trim() || null,
    });

    if (error) {
      toast({ title: "حدث خطأ", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "تم إرسال الطلب بنجاح! ✅", description: "سيتم إبلاغ الحرفي بطلبك" });
      onOpenChange(false);
      setTitle("");
      setDescription("");
      setLocation("");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md font-cairo">
        <DialogHeader>
          <DialogTitle className="font-cairo">طلب خدمة من {craftsmanName}</DialogTitle>
          <DialogDescription>أرسل تفاصيل الخدمة المطلوبة</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">عنوان الطلب *</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="مثال: صيانة كهرباء المنزل" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">وصف المشكلة *</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="اشرح تفاصيل الخدمة المطلوبة..." rows={4} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">الموقع</label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="المدينة أو العنوان" />
          </div>
          <Button type="submit" variant="accent" className="w-full" disabled={loading}>
            {loading ? "جاري الإرسال..." : "إرسال الطلب"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestDialog;
