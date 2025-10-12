import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CareerCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
  gradient: string;
}

export function CareerCard({ id, title, description, image, icon, gradient }: CareerCardProps) {
  return (
    <Link to={`/experience/${id}`}>
      <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card h-full cursor-pointer">
        {/* Image */}
        <div className="relative h-32 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 brightness-110 contrast-105 saturate-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${gradient} to-transparent opacity-20 group-hover:opacity-30 transition-opacity`} />
          
          {/* Icon Badge */}
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/95 backdrop-blur-sm flex items-center justify-center text-lg shadow-lg border border-primary/20">
            {icon}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-2">
            {title}
          </h3>
          
          <p className="text-xs text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </Card>
    </Link>
  );
}
