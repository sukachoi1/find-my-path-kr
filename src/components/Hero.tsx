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
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/30">
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
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 animate-in fade-in duration-700">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">한국 학생들을 위한 진로 탐험</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-700">
          꿈을 찾는 여정
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-700 delay-100">
          공부만 하느라 놓쳤던 다양한 경험들,<br />
          이제 온라인으로 간접 체험하며<br />
          <span className="text-foreground font-semibold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            나만의 재능과 열정을 발견하세요
          </span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in slide-in-from-bottom-4 duration-700 delay-200">
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
          
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 hover-scale"
            onClick={scrollToAbout}
          >
            더 알아보기
          </Button>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto animate-in fade-in duration-700 delay-300">
          <div className="space-y-3 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm hover-scale transition-all">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-primary/10">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent">6개 분야</div>
            <div className="text-sm text-muted-foreground">다양한 직업 체험</div>
          </div>
          
          <div className="space-y-3 p-6 rounded-2xl bg-gradient-to-br from-secondary/5 to-secondary/10 backdrop-blur-sm hover-scale transition-all">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-secondary/10">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--secondary))] to-[hsl(var(--secondary-glow))] bg-clip-text text-transparent">42개 과제</div>
            <div className="text-sm text-muted-foreground">실전 문제 해결</div>
          </div>
          
          <div className="space-y-3 p-6 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 backdrop-blur-sm hover-scale transition-all">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-accent/10">
                <Users className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(200_90%_65%)] bg-clip-text text-transparent">무료</div>
            <div className="text-sm text-muted-foreground">누구나 참여 가능</div>
          </div>
        </div>
      </div>
    </div>
  );
}
