import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, TrendingUp, Users } from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";

export function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/30">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 animate-[scale-in_20s_ease-in-out_infinite]"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-[bounce_3s_ease-in-out_infinite]" />
        <div className="absolute bottom-32 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-[bounce_4s_ease-in-out_infinite_1s]" />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-[bounce_5s_ease-in-out_infinite_2s]" />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-black mb-4 relative tracking-tight">
          <span className="absolute inset-0 blur-3xl bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50 opacity-40 animate-pulse"></span>
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-[gradient_3s_ease-in-out_infinite] bg-clip-text text-transparent blur-sm opacity-70"></span>
            <span className="relative bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-[gradient_3s_ease-in-out_infinite] bg-clip-text text-transparent font-black">
              꿈을 찾는 여정
            </span>
          </span>
        </h1>
        
        <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
          공부만 하느라 놓쳤던 다양한 경험들, 이제 온라인으로 간접 체험하며
          <span className="text-foreground font-semibold"> 나만의 재능과 열정을 발견하세요</span>
        </p>
        
        <Link to="/auth">
          <Button 
            size="lg" 
            variant="hero"
            className="group hover-scale shadow-lg"
          >
            지금 시작하기
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
