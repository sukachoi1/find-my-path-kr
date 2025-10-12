import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-students.jpg";

export function Hero() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/30">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-700">
          꿈을 찾는 여정
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-700 delay-100">
          공부만 하느라 놓쳤던 다양한 경험들,<br />
          이제 온라인으로 간접 체험하며<br />
          <span className="text-foreground font-semibold">나만의 재능과 열정을 발견하세요</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in slide-in-from-bottom-4 duration-700 delay-200">
          <Button 
            size="lg" 
            variant="hero"
            className="group"
          >
            지금 시작하기
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="border-2"
          >
            더 알아보기
          </Button>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-in fade-in duration-700 delay-300">
          <div className="space-y-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent">50+</div>
            <div className="text-sm text-muted-foreground">직업 체험</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--secondary))] to-[hsl(var(--secondary-glow))] bg-clip-text text-transparent">10,000+</div>
            <div className="text-sm text-muted-foreground">참여 학생</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(200_90%_65%)] bg-clip-text text-transparent">95%</div>
            <div className="text-sm text-muted-foreground">만족도</div>
          </div>
        </div>
      </div>
    </div>
  );
}
