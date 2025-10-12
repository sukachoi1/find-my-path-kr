import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CareerCardProps {
  title: string;
  description: string;
  image: string;
  icon: string;
  gradient: string;
}

export function CareerCard({ title, description, image, icon, gradient }: CareerCardProps) {
  return (
    <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-lg)] hover:-translate-y-2 bg-card">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient} to-transparent opacity-60`} />
        
        {/* Icon Badge */}
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-2xl shadow-[var(--shadow-md)]">
          {icon}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        <Button 
          variant="ghost" 
          className="w-full group/button hover:bg-primary/10"
        >
          <span className="group-hover/button:text-primary transition-colors">체험하기</span>
          <span className="ml-2 group-hover/button:translate-x-1 transition-transform">→</span>
        </Button>
      </div>
    </Card>
  );
}
