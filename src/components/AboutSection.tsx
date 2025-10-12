import { Card } from "@/components/ui/card";
import { Code, Palette, Target, Brain } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "실전 코딩 체험",
    description: "실제로 코드를 작성하고 실행하며 프로그래밍의 기초를 배워보세요.",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    icon: Palette,
    title: "창의적 문제 해결",
    description: "디자인, 예술, 과학 등 다양한 분야의 실무 과제를 직접 경험하세요.",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    icon: Target,
    title: "맞춤형 진로 탐색",
    description: "나의 흥미와 적성에 맞는 분야를 찾고 진로를 구체화하세요.",
    color: "text-teal-600",
    bgColor: "bg-teal-50 dark:bg-teal-950/30",
  },
  {
    icon: Brain,
    title: "즉각적인 피드백",
    description: "과제를 완료하면 바로 결과를 확인하고 개선점을 파악할 수 있어요.",
    color: "text-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-950/30",
  },
];

export function AboutSection() {
  return (
    <div id="about-section" className="py-12 px-4 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent">
              어떻게 작동하나요?
            </span>
          </h2>
          <p className="text-base text-muted-foreground">
            실제 업무 환경을 체험하며 나에게 맞는 진로를 찾아보세요
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-4 hover-scale transition-all duration-300 hover:shadow-lg border-2"
            >
              <div className={`w-10 h-10 rounded-xl ${feature.bgColor} flex items-center justify-center mb-3`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="text-base font-bold mb-2">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* How It Works Steps */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-[hsl(var(--secondary))] to-[hsl(var(--secondary-glow))] bg-clip-text text-transparent">
              3단계로 시작하세요
            </span>
          </h3>
          
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "분야 선택",
                description: "IT, 디자인, 의료, 비즈니스, 예술, 과학 중 관심있는 분야를 선택하세요.",
                color: "from-primary to-primary-glow"
              },
              {
                step: "2",
                title: "과제 수행",
                description: "실제 업무와 유사한 과제를 해결하며 각 분야의 특징을 체험하세요.",
                color: "from-secondary to-secondary-glow"
              },
              {
                step: "3",
                title: "결과 확인",
                description: "나의 정답률과 피드백을 확인하고 적성에 맞는지 판단하세요.",
                color: "from-accent to-[hsl(200_90%_65%)]"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="relative flex items-center gap-4"
              >
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-xl font-bold text-white">{item.step}</span>
                  </div>
                </div>
                
                {/* Content */}
                <Card className="flex-1 p-4 hover-scale transition-all">
                  <h4 className="text-base font-bold mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
