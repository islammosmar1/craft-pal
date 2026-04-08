import { Star, MapPin, ArrowLeft, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface CraftsmanCardData {
  id: string;
  name: string;
  specialty: string;
  specialtyIcon: string;
  location: string;
  rating: number;
  reviewCount: number;
  experience: number;
  available: boolean;
}

interface CraftsmanCardProps {
  craftsman: CraftsmanCardData;
}

const CraftsmanCard = ({ craftsman }: CraftsmanCardProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
      <div className="p-6 flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-accent/8 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 group-hover:bg-accent/12 transition-all duration-300">
          {craftsman.specialtyIcon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-foreground text-base font-cairo truncate">{craftsman.name}</h3>
            {craftsman.available && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
          </div>
          <p className="text-accent font-semibold text-sm">{craftsman.specialty}</p>
        </div>
        <div className="flex items-center gap-1 bg-accent/8 px-2.5 py-1.5 rounded-xl shrink-0">
          <Star className="w-3.5 h-3.5 text-accent fill-accent" />
          <span className="font-bold text-sm text-foreground">{craftsman.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="px-6 pb-3 space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-accent/50" />
          <span>{craftsman.location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Clock className="w-3.5 h-3.5 shrink-0 text-accent/50" />
          <span>{craftsman.experience} سنة خبرة</span>
        </div>
      </div>

      <div className="px-6 pb-5 flex items-center justify-between border-t border-border/30 pt-4 mt-2">
        <span className="text-xs text-muted-foreground bg-secondary/60 px-3 py-1 rounded-full">
          {craftsman.reviewCount} تقييم
        </span>
        <Link to={`/craftsman/${craftsman.id}`} className="flex items-center gap-1.5 text-accent font-semibold text-sm hover:gap-2.5 transition-all duration-200 group/link">
          عرض الملف
          <ArrowLeft className="w-3.5 h-3.5 group-hover/link:-translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default CraftsmanCard;
