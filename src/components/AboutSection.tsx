import { Card } from "@/components/ui/card";

export function AboutSection() {
  return (
    <div id="about-section" className="py-6 px-4 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold mb-1">
            <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent">
              어떻게 작동하나요?
            </span>
          </h3>
        </div>

        {/* Compact Steps */}
        <div className="grid grid-cols-3 gap-3 max-w-3xl mx-auto">
          {[
            { step: "1", title: "분야 선택", icon: "🎯", color: "from-primary to-primary-glow" },
            { step: "2", title: "과제 수행", icon: "✍️", color: "from-secondary to-secondary-glow" },
            { step: "3", title: "결과 확인", icon: "📊", color: "from-accent to-[hsl(200_90%_65%)]" }
          ].map((item, index) => (
            <Card 
              key={index}
              className="p-3 hover-scale transition-all text-center"
            >
              <div className={`w-8 h-8 mx-auto rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md mb-2`}>
                <span className="text-sm">{item.icon}</span>
              </div>
              <h4 className="text-sm font-bold mb-1">{item.title}</h4>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
