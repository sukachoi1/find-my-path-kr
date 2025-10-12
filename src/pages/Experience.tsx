import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface ExperienceContent {
  title: string;
  icon: string;
  intro: string;
  tasks: {
    title: string;
    description: string;
    options: string[];
    correctAnswer: number;
  }[];
}

const experienceData: Record<string, ExperienceContent> = {
  "1": {
    title: "IT & 개발",
    icon: "💻",
    intro: "간단한 프로그래밍 문제를 해결하며 개발자의 사고방식을 체험해보세요!",
    tasks: [
      {
        title: "변수 선언하기",
        description: "나이를 저장하는 변수를 JavaScript로 어떻게 선언할까요?",
        options: ["let age = 20", "age = 20", "var 20 = age", "const age"],
        correctAnswer: 0,
      },
      {
        title: "조건문 이해하기",
        description: "18세 이상이면 '성인'을 출력하는 코드는?",
        options: [
          "if age >= 18 then print '성인'",
          "if (age >= 18) { console.log('성인') }",
          "when age > 18 show '성인'",
          "age >= 18 ? '성인'",
        ],
        correctAnswer: 1,
      },
    ],
  },
  "2": {
    title: "디자인 & 창작",
    icon: "🎨",
    intro: "색상과 레이아웃을 선택하며 디자이너의 감각을 체험해보세요!",
    tasks: [
      {
        title: "색상 조합",
        description: "신뢰감을 주는 기업 웹사이트에 가장 적합한 색상 조합은?",
        options: ["빨강 + 검정", "파랑 + 흰색", "노랑 + 분홍", "주황 + 보라"],
        correctAnswer: 1,
      },
      {
        title: "UI 레이아웃",
        description: "모바일 앱의 중요한 버튼은 어디에 배치해야 할까요?",
        options: ["화면 상단", "화면 하단 (엄지 도달 영역)", "화면 중앙", "화면 모서리"],
        correctAnswer: 1,
      },
    ],
  },
  "3": {
    title: "의료 & 건강",
    icon: "⚕️",
    intro: "환자의 증상을 파악하고 적절한 조치를 취하는 의료인의 역할을 경험해보세요!",
    tasks: [
      {
        title: "응급 상황 판단",
        description: "갑자기 가슴 통증을 호소하는 환자, 가장 먼저 해야 할 일은?",
        options: [
          "진통제 처방",
          "혈압과 맥박 측정 및 119 연락",
          "물을 마시게 함",
          "휴식을 취하게 함",
        ],
        correctAnswer: 1,
      },
      {
        title: "건강 상담",
        description: "불면증을 호소하는 환자에게 가장 적절한 조언은?",
        options: [
          "수면제를 매일 복용하기",
          "규칙적인 수면 시간과 카페인 줄이기",
          "낮잠 많이 자기",
          "밤늦게까지 운동하기",
        ],
        correctAnswer: 1,
      },
    ],
  },
  "4": {
    title: "비즈니스 & 경영",
    icon: "💼",
    intro: "비즈니스 의사결정과 전략 수립을 체험해보세요!",
    tasks: [
      {
        title: "마케팅 전략",
        description: "신제품 출시 시 가장 효과적인 초기 마케팅 전략은?",
        options: [
          "모든 매체에 광고 집행",
          "타겟 고객층 분석 후 맞춤 전략 수립",
          "가격 할인만 진행",
          "경쟁사 모방",
        ],
        correctAnswer: 1,
      },
      {
        title: "위기 관리",
        description: "고객 불만이 SNS에서 확산될 때 가장 먼저 해야 할 일은?",
        options: [
          "무시하기",
          "신속한 공식 사과와 해결 방안 제시",
          "법적 대응 경고",
          "댓글 삭제",
        ],
        correctAnswer: 1,
      },
    ],
  },
  "5": {
    title: "예술 & 문화",
    icon: "🎭",
    intro: "예술 작품을 감상하고 창작하는 예술가의 세계를 경험해보세요!",
    tasks: [
      {
        title: "작품 해석",
        description: "추상화 작품을 해석할 때 가장 중요한 것은?",
        options: [
          "정답을 찾기",
          "자신만의 감정과 해석 찾기",
          "다른 사람의 해석 따라하기",
          "작가의 의도만 찾기",
        ],
        correctAnswer: 1,
      },
      {
        title: "공연 기획",
        description: "성공적인 공연을 위해 가장 먼저 고려해야 할 것은?",
        options: [
          "화려한 무대 장치",
          "관객층 분석과 콘텐츠 기획",
          "유명 배우 섭외",
          "티켓 가격 책정",
        ],
        correctAnswer: 1,
      },
    ],
  },
  "6": {
    title: "과학 & 연구",
    icon: "🔬",
    intro: "과학적 방법으로 문제를 해결하는 연구자의 사고방식을 체험해보세요!",
    tasks: [
      {
        title: "실험 설계",
        description: "식물 성장에 빛의 영향을 알아보려면 어떻게 실험해야 할까요?",
        options: [
          "모든 식물에 같은 양의 빛 주기",
          "빛의 양만 다르게 하고 나머지 조건 동일하게",
          "물과 빛 모두 다르게 주기",
          "관찰만 하기",
        ],
        correctAnswer: 1,
      },
      {
        title: "데이터 분석",
        description: "실험 결과가 예상과 다를 때 과학자가 해야 할 일은?",
        options: [
          "데이터 조작",
          "실험 과정 재검토와 재실험",
          "결과 무시",
          "이론 강제로 맞추기",
        ],
        correctAnswer: 1,
      },
    ],
  },
};

export default function Experience() {
  const { id } = useParams<{ id: string }>();
  const [currentTask, setCurrentTask] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const content = id ? experienceData[id] : null;

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">체험 프로그램을 찾을 수 없습니다</h2>
          <Link to="/">
            <Button>홈으로 돌아가기</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const currentTaskData = content.tasks[currentTask];
  const isLastTask = currentTask === content.tasks.length - 1;
  const allCompleted = currentTask >= content.tasks.length;

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === currentTaskData.correctAnswer;
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (isLastTask) {
      setCurrentTask(currentTask + 1);
    } else {
      setCurrentTask(currentTask + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  if (allCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="p-8 text-center space-y-6">
            <div className="text-6xl mb-4">{content.icon}</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent">
              체험 완료! 🎉
            </h1>
            <div className="text-xl text-muted-foreground">
              <p className="mb-2">
                <span className="font-bold text-primary">{content.title}</span> 체험을 완료했습니다!
              </p>
              <p className="text-3xl font-bold text-foreground my-6">
                정답률: {Math.round((correctCount / content.tasks.length) * 100)}%
              </p>
              <p className="text-base">
                {correctCount === content.tasks.length
                  ? "완벽합니다! 이 분야에 적성이 있을 수 있어요! 🌟"
                  : correctCount >= content.tasks.length / 2
                  ? "잘하셨어요! 조금만 더 공부하면 완벽해질 거예요! 💪"
                  : "괜찮아요! 새로운 것을 배우는 과정이니까요! 다시 도전해보세요! 🚀"}
              </p>
            </div>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  홈으로
                </Button>
              </Link>
              <Button 
                size="lg" 
                onClick={() => {
                  setCurrentTask(0);
                  setSelectedAnswer(null);
                  setShowResult(false);
                  setCorrectCount(0);
                }}
              >
                다시 체험하기
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              돌아가기
            </Button>
          </Link>
          
          <div className="text-center space-y-2">
            <div className="text-5xl mb-2">{content.icon}</div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent">
              {content.title} 체험
            </h1>
            <p className="text-muted-foreground">{content.intro}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>진행률</span>
            <span>{currentTask + 1} / {content.tasks.length}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentTask + 1) / content.tasks.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Task Card */}
        <Card className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{currentTaskData.title}</h2>
            <p className="text-muted-foreground">{currentTaskData.description}</p>
          </div>

          <div className="space-y-3">
            {currentTaskData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  showResult
                    ? index === currentTaskData.correctAnswer
                      ? "border-green-500 bg-green-50 dark:bg-green-950"
                      : index === selectedAnswer
                      ? "border-red-500 bg-red-50 dark:bg-red-950"
                      : "border-border"
                    : selectedAnswer === index
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && index === currentTaskData.correctAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className={`p-4 rounded-lg ${
              selectedAnswer === currentTaskData.correctAnswer
                ? "bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100"
                : "bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100"
            }`}>
              <p className="font-semibold">
                {selectedAnswer === currentTaskData.correctAnswer
                  ? "정답입니다! 🎉"
                  : "아쉽네요! 다음에는 잘할 수 있을 거예요!"}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            {!showResult ? (
              <Button 
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                size="lg"
              >
                제출하기
              </Button>
            ) : (
              <Button onClick={handleNext} size="lg">
                {isLastTask ? "결과 보기" : "다음 문제"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
