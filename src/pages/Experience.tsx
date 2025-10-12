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
    intro: "실제 개발자처럼 문제를 해결하고 앱을 만들어보는 과정을 체험해보세요!",
    tasks: [
      {
        title: "프로젝트 시작: 할 일 앱 기획",
        description: "고객이 간단한 할 일 관리 앱을 요청했습니다. 가장 먼저 해야 할 일은?",
        options: [
          "바로 코딩 시작하기",
          "필요한 기능 목록 작성하고 우선순위 정하기",
          "디자인만 먼저 완성하기",
          "데이터베이스부터 만들기",
        ],
        correctAnswer: 1,
      },
      {
        title: "변수와 데이터 타입",
        description: "사용자 정보를 저장하려고 합니다. 올바른 코드는?",
        options: [
          "let user = { name: '김철수', age: 20, email: 'kim@example.com' }",
          "var user = name, age, email",
          "const user = '김철수', 20, 'kim@example.com'",
          "user = ['김철수' + 20 + 'kim@example.com']",
        ],
        correctAnswer: 0,
      },
      {
        title: "조건문으로 로직 구현",
        description: "로그인 시 비밀번호가 일치하면 '로그인 성공', 아니면 '비밀번호 오류'를 표시하려면?",
        options: [
          "if password == correct { success } else { error }",
          "if (password === correctPassword) { alert('로그인 성공') } else { alert('비밀번호 오류') }",
          "when password = correct show success",
          "password === correct ? login : error",
        ],
        correctAnswer: 1,
      },
      {
        title: "반복문 활용",
        description: "할 일 목록의 모든 항목을 화면에 표시하려면 어떤 방법이 가장 적합할까요?",
        options: [
          "각 항목을 하나씩 직접 쓰기",
          "배열.map()을 사용해서 각 항목을 컴포넌트로 변환",
          "if문으로 하나씩 확인",
          "항목 개수만큼 코드 복사하기",
        ],
        correctAnswer: 1,
      },
      {
        title: "버그 수정하기",
        description: "앱이 느려진다는 사용자 피드백이 왔습니다. 가장 먼저 할 일은?",
        options: [
          "전체 코드 다시 작성",
          "성능 측정 도구로 병목 지점 찾기",
          "서버만 업그레이드하기",
          "사용자에게 기다리라고 하기",
        ],
        correctAnswer: 1,
      },
      {
        title: "팀 협업",
        description: "다른 개발자가 작성한 코드를 수정해야 합니다. 가장 좋은 방법은?",
        options: [
          "코드 전체를 내 스타일로 다시 작성",
          "원작성자에게 코드 설명 듣고 필요한 부분만 수정",
          "아무것도 건드리지 않기",
          "주석 없이 바로 수정",
        ],
        correctAnswer: 1,
      },
      {
        title: "배포 준비",
        description: "앱을 사용자에게 공개하기 전에 반드시 해야 할 일은?",
        options: [
          "바로 배포하기",
          "테스트 실행, 보안 검토, 백업 준비",
          "디자인만 다시 확인",
          "친구에게만 먼저 보여주기",
        ],
        correctAnswer: 1,
      },
    ],
  },
  "2": {
    title: "디자인 & 창작",
    icon: "🎨",
    intro: "실제 디자인 프로젝트를 진행하며 사용자 경험을 설계하는 과정을 체험해보세요!",
    tasks: [
      {
        title: "클라이언트 미팅",
        description: "카페 주인이 '예쁜 앱'을 만들어달라고 합니다. 가장 먼저 물어봐야 할 것은?",
        options: [
          "좋아하는 색상이 뭔가요?",
          "타겟 고객은 누구이고, 어떤 기능이 필요한가요?",
          "예산이 얼마인가요?",
          "언제까지 완성해야 하나요?",
        ],
        correctAnswer: 1,
      },
      {
        title: "사용자 조사",
        description: "20대를 위한 운동 앱을 디자인합니다. 무엇을 먼저 조사해야 할까요?",
        options: [
          "경쟁 앱만 분석",
          "20대의 운동 습관, 선호도, 불편한 점 인터뷰",
          "최신 디자인 트렌드만 참고",
          "내 취향대로 디자인",
        ],
        correctAnswer: 1,
      },
      {
        title: "색상 심리학",
        description: "건강식품 브랜드의 색상을 선택합니다. 가장 적합한 색은?",
        options: [
          "빨강 (활력, 흥분)",
          "초록 (자연, 건강, 신선함)",
          "검정 (고급, 무거움)",
          "보라 (신비, 고급)",
        ],
        correctAnswer: 1,
      },
      {
        title: "UI 레이아웃 설계",
        description: "뉴스 앱의 첫 화면에서 가장 중요한 것은?",
        options: [
          "광고를 가장 크게",
          "주요 뉴스를 쉽게 찾을 수 있는 구조",
          "화려한 애니메이션",
          "모든 기능을 한 화면에",
        ],
        correctAnswer: 1,
      },
      {
        title: "타이포그래피",
        description: "어린이 교육 앱의 글꼴 선택에서 가장 중요한 것은?",
        options: [
          "멋진 장식 글꼴",
          "읽기 쉽고 친근한 글꼴, 적절한 크기",
          "가장 작은 크기의 글꼴",
          "여러 가지 글꼴 섞어쓰기",
        ],
        correctAnswer: 1,
      },
      {
        title: "사용자 피드백 반영",
        description: "베타 테스터들이 '버튼을 찾기 어렵다'고 합니다. 어떻게 해야 할까요?",
        options: [
          "디자인은 그대로 두고 설명서 추가",
          "버튼 크기, 색상, 위치를 개선하고 재테스트",
          "테스터를 교체",
          "무시하기",
        ],
        correctAnswer: 1,
      },
      {
        title: "접근성 고려",
        description: "모든 사용자가 쓸 수 있는 디자인을 위해 필수적인 것은?",
        options: [
          "예쁜 색상만 중요",
          "색약자 고려, 충분한 대비, 큰 터치 영역",
          "최신 트렌드만 따라가기",
          "젊은 사용자만 고려",
        ],
        correctAnswer: 1,
      },
    ],
  },
  "3": {
    title: "의료 & 건강",
    icon: "⚕️",
    intro: "실제 의료 현장에서 환자를 진단하고 치료하는 의료인의 하루를 체험해보세요!",
    tasks: [
      {
        title: "아침 회진",
        description: "입원 환자가 '밤새 열이 났어요'라고 합니다. 첫 번째 조치는?",
        options: [
          "즉시 해열제 투여",
          "체온 측정, 활력징후 확인, 증상 발생 시간 파악",
          "다음 회진까지 기다리기",
          "보호자에게만 알리기",
        ],
        correctAnswer: 1,
      },
      {
        title: "응급실: 우선순위 판단",
        description: "동시에 3명의 환자가 왔습니다. 누구를 먼저 봐야 할까요?",
        options: [
          "먼저 온 순서대로",
          "가슴 통증과 호흡곤란을 호소하는 환자",
          "발목 삐끗한 환자",
          "가벼운 감기 증상 환자",
        ],
        correctAnswer: 1,
      },
      {
        title: "진단: 증상 분석",
        description: "두통, 발열, 목 뻐근함을 호소하는 환자. 의심되는 질환은?",
        options: [
          "단순 감기",
          "뇌수막염 가능성 - 추가 검사 필요",
          "스트레스성 두통",
          "편두통",
        ],
        correctAnswer: 1,
      },
      {
        title: "처방 결정",
        description: "고혈압 환자가 약을 먹으면 어지럽다고 합니다. 어떻게 해야 할까요?",
        options: [
          "약을 끊으라고 하기",
          "부작용 확인, 용량 조절 또는 약 변경 고려",
          "참고 계속 복용하라고 하기",
          "다른 병원 가라고 하기",
        ],
        correctAnswer: 1,
      },
      {
        title: "환자 상담",
        description: "당뇨 진단받은 환자가 불안해합니다. 가장 중요한 말은?",
        options: [
          "무섭지 않다고 거짓말하기",
          "관리 방법 설명하고, 잘 관리하면 정상 생활 가능하다고 안심시키기",
          "겁을 주기",
          "대충 넘어가기",
        ],
        correctAnswer: 1,
      },
      {
        title: "감염 관리",
        description: "독감이 유행하는 시기, 병원에서 가장 중요한 것은?",
        options: [
          "환자 받지 않기",
          "손 씻기, 마스크 착용, 환자 격리",
          "약만 많이 처방하기",
          "창문만 열어두기",
        ],
        correctAnswer: 1,
      },
      {
        title: "의료 윤리",
        description: "환자 정보를 친구가 궁금해합니다. 어떻게 해야 할까요?",
        options: [
          "친구니까 알려주기",
          "환자 동의 없이는 절대 정보 공개 안 함",
          "대충만 알려주기",
          "암시만 주기",
        ],
        correctAnswer: 1,
      },
    ],
  },
  "4": {
    title: "비즈니스 & 경영",
    icon: "💼",
    intro: "스타트업을 운영하며 실제 비즈니스 의사결정을 내리는 CEO의 하루를 체험해보세요!",
    tasks: [
      {
        title: "시장 조사",
        description: "새로운 배달 앱 사업을 시작하려고 합니다. 가장 먼저 할 일은?",
        options: [
          "바로 개발 시작",
          "시장 규모, 경쟁사, 고객 니즈 분석",
          "투자 먼저 받기",
          "사무실부터 구하기",
        ],
        correctAnswer: 1,
      },
      {
        title: "비즈니스 모델",
        description: "무료 앱으로 어떻게 수익을 낼 수 있을까요?",
        options: [
          "수익 없이 운영",
          "광고, 프리미엄 기능, 수수료 등 다양한 수익 모델 설계",
          "유료로만 전환",
          "투자금만 의존",
        ],
        correctAnswer: 1,
      },
      {
        title: "팀 빌딩",
        description: "초기 스타트업에서 가장 먼저 채용해야 할 사람은?",
        options: [
          "유명한 사람 아무나",
          "회사 비전에 공감하고 다양한 역할을 할 수 있는 인재",
          "친구들만 모으기",
          "많이 뽑기",
        ],
        correctAnswer: 1,
      },
      {
        title: "예산 관리",
        description: "매출은 있지만 적자가 계속됩니다. 어떻게 해야 할까요?",
        options: [
          "더 큰 투자 받기만 하기",
          "비용 구조 분석하고 불필요한 지출 줄이기",
          "직원 월급 줄이기만",
          "사업 포기",
        ],
        correctAnswer: 1,
      },
      {
        title: "마케팅 전략",
        description: "예산 1000만원으로 최대 효과를 내려면?",
        options: [
          "TV 광고 한 번",
          "타겟 고객이 있는 채널에 집중 투자 (SNS, 인플루언서)",
          "전단지 뿌리기",
          "아무 데나 쓰기",
        ],
        correctAnswer: 1,
      },
      {
        title: "고객 피드백",
        description: "출시한 제품에 부정적 리뷰가 많습니다. 어떻게 대응할까요?",
        options: [
          "리뷰 삭제 요청",
          "문제점 파악, 개선 계획 발표, 고객과 소통",
          "무시하기",
          "변명하기",
        ],
        correctAnswer: 1,
      },
      {
        title: "성장 전략",
        description: "사업이 안정화되었습니다. 다음 단계는?",
        options: [
          "아무것도 안 하기",
          "시장 확대, 신규 서비스, 파트너십 등 성장 전략 수립",
          "직원만 늘리기",
          "현상 유지만",
        ],
        correctAnswer: 1,
      },
    ],
  },
  "5": {
    title: "예술 & 문화",
    icon: "🎭",
    intro: "뮤지컬을 기획하고 제작하는 전 과정을 경험하며 예술가의 창작 여정을 체험해보세요!",
    tasks: [
      {
        title: "작품 기획",
        description: "청소년을 위한 뮤지컬을 만들려고 합니다. 가장 먼저 할 일은?",
        options: [
          "유명한 작품 베끼기",
          "청소년의 고민과 관심사 조사, 메시지 결정",
          "무대 장치부터 디자인",
          "배우 섭외",
        ],
        correctAnswer: 1,
      },
      {
        title: "대본 작성",
        description: "스토리가 지루하다는 피드백을 받았습니다. 개선 방법은?",
        options: [
          "무시하고 진행",
          "갈등 구조 강화, 캐릭터 매력 향상, 반전 추가",
          "대본 전체 바꾸기",
          "배우 탓하기",
        ],
        correctAnswer: 1,
      },
      {
        title: "음악 작곡",
        description: "슬픈 이별 장면의 노래를 만듭니다. 어떤 요소가 중요할까요?",
        options: [
          "빠른 템포, 신나는 멜로디",
          "느린 템포, 단조, 감성적인 가사",
          "랩",
          "아무 노래나",
        ],
        correctAnswer: 1,
      },
      {
        title: "캐스팅",
        description: "주인공 역할의 배우를 선택합니다. 가장 중요한 기준은?",
        options: [
          "인기만 많으면 됨",
          "연기력, 캐릭터 이해도, 팀워크",
          "외모만 보기",
          "친한 사람 선택",
        ],
        correctAnswer: 1,
      },
      {
        title: "무대 디자인",
        description: "작은 극장에서 큰 스케일의 이야기를 보여주려면?",
        options: [
          "포기하기",
          "조명, 영상, 상징적 소품으로 창의적 표현",
          "무대 장치 없이 하기",
          "다른 곳에서 하기",
        ],
        correctAnswer: 1,
      },
      {
        title: "리허설",
        description: "배우들의 호흡이 맞지 않습니다. 연출가로서 어떻게 할까요?",
        options: [
          "배우들을 혼내기",
          "팀 빌딩 활동, 연기 워크숍, 소통 강화",
          "교체하기",
          "방치하기",
        ],
        correctAnswer: 1,
      },
      {
        title: "공연 당일",
        description: "공연 중 소품이 망가졌습니다! 무대 위에서 어떻게 해야 할까요?",
        options: [
          "공연 중단",
          "즉흥적으로 상황 넘기고 계속 진행",
          "패닉",
          "관객에게 사과",
        ],
        correctAnswer: 1,
      },
    ],
  },
  "6": {
    title: "과학 & 연구",
    icon: "🔬",
    intro: "신약 개발 프로젝트를 통해 과학적 탐구와 연구의 전 과정을 체험해보세요!",
    tasks: [
      {
        title: "연구 주제 선정",
        description: "암 치료제 연구를 시작합니다. 가장 먼저 할 일은?",
        options: [
          "바로 실험 시작",
          "기존 연구 논문 검토, 연구 가설 수립",
          "실험실부터 꾸미기",
          "연구비 신청만",
        ],
        correctAnswer: 1,
      },
      {
        title: "실험 설계",
        description: "신약 후보 물질의 효과를 테스트합니다. 올바른 실험 설계는?",
        options: [
          "한 번만 실험하기",
          "대조군 설정, 변수 통제, 충분한 반복 실험",
          "결과 좋은 것만 선택",
          "다른 연구 베끼기",
        ],
        correctAnswer: 1,
      },
      {
        title: "데이터 수집",
        description: "실험 중 예상치 못한 결과가 나왔습니다. 어떻게 해야 할까요?",
        options: [
          "결과 버리기",
          "정확히 기록하고 원인 분석, 새로운 발견 가능성 탐색",
          "조작하기",
          "무시하기",
        ],
        correctAnswer: 1,
      },
      {
        title: "데이터 분석",
        description: "수집한 데이터를 분석할 때 가장 중요한 것은?",
        options: [
          "내 가설에 맞게 해석",
          "통계적 유의성 확인, 객관적 분석",
          "원하는 결과만 선택",
          "대충 보기",
        ],
        correctAnswer: 1,
      },
      {
        title: "실험 실패",
        description: "6개월 실험이 실패했습니다. 연구자의 올바른 태도는?",
        options: [
          "연구 포기",
          "실패 원인 분석, 새로운 가설 수립, 재도전",
          "데이터 조작",
          "다른 사람 탓하기",
        ],
        correctAnswer: 1,
      },
      {
        title: "논문 작성",
        description: "연구 결과를 논문으로 발표합니다. 가장 중요한 것은?",
        options: [
          "과장해서 쓰기",
          "정직하고 정확한 기록, 한계점도 명시",
          "실패는 빼고 쓰기",
          "다른 논문 베끼기",
        ],
        correctAnswer: 1,
      },
      {
        title: "동료 평가",
        description: "동료 과학자가 내 논문에 문제를 제기했습니다. 어떻게 할까요?",
        options: [
          "화내기",
          "피드백 수용, 재검증, 토론을 통한 발전",
          "무시하기",
          "관계 끊기",
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
