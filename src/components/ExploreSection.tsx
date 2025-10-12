import { CareerCard } from "./CareerCard";
import techImage from "@/assets/career-tech.jpg";
import designImage from "@/assets/career-design.jpg";
import medicalImage from "@/assets/career-medical.jpg";
import businessImage from "@/assets/career-business.jpg";
import artsImage from "@/assets/career-arts.jpg";
import scienceImage from "@/assets/career-science.jpg";

const careers = [
  {
    id: 1,
    title: "IT & 개발",
    description: "코딩, 앱 개발, AI 등 미래를 이끌 기술을 체험하고 창의적인 문제 해결 능력을 키워보세요.",
    image: techImage,
    icon: "💻",
    gradient: "from-purple-600/80",
  },
  {
    id: 2,
    title: "디자인 & 창작",
    description: "그래픽 디자인, UI/UX, 영상 제작 등 예술과 기술이 만나는 창의적인 세계를 경험하세요.",
    image: designImage,
    icon: "🎨",
    gradient: "from-orange-500/80",
  },
  {
    id: 3,
    title: "의료 & 건강",
    description: "의사, 간호사, 물리치료사 등 생명을 돌보는 보람찬 직업의 세계를 탐험하세요.",
    image: medicalImage,
    icon: "⚕️",
    gradient: "from-teal-500/80",
  },
  {
    id: 4,
    title: "비즈니스 & 경영",
    description: "마케팅, 경영, 창업 등 비즈니스 세계의 전략과 리더십을 배워보세요.",
    image: businessImage,
    icon: "💼",
    gradient: "from-pink-600/80",
  },
  {
    id: 5,
    title: "예술 & 문화",
    description: "음악, 미술, 공연 예술 등 감성을 표현하고 문화를 만들어가는 예술가의 길을 체험하세요.",
    image: artsImage,
    icon: "🎭",
    gradient: "from-red-500/80",
  },
  {
    id: 6,
    title: "과학 & 연구",
    description: "실험, 연구, 발견의 즐거움! 세상의 비밀을 밝히는 과학자의 세계를 경험하세요.",
    image: scienceImage,
    icon: "🔬",
    gradient: "from-blue-600/80",
  },
];

export function ExploreSection() {
  return (
    <div className="py-12 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent">
              진로 분야 선택하기
            </span>
          </h2>
          <p className="text-base text-muted-foreground">
            관심있는 분야를 클릭해서 체험을 시작하세요
          </p>
        </div>
        
        {/* Career Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {careers.map((career) => (
            <CareerCard
              key={career.id}
              id={career.id}
              title={career.title}
              description={career.description}
              image={career.image}
              icon={career.icon}
              gradient={career.gradient}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
