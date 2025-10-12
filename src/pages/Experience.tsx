import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface Task {
  title: string;
  description: string;
  options?: string[];
  correctAnswer?: number;
  type?: "quiz" | "code";
  codeChallenge?: {
    instruction: string;
    starterCode: string;
    solution: string;
    hint: string;
  };
}

interface ExperienceContent {
  title: string;
  icon: string;
  intro: string;
  tasks: Task[];
}

const experienceData: Record<string, ExperienceContent> = {
  "1": {
    title: "IT & 개발",
    icon: "💻",
    intro: "코딩을 처음부터 배우며 직접 코드를 작성하고 실행하는 경험을 해보세요!",
    tasks: [
      {
        type: "code",
        title: "첫 코드 작성하기",
        description: "프로그래밍의 시작! 화면에 '안녕하세요!'를 출력하는 코드를 작성해보세요.",
        codeChallenge: {
          instruction: "console.log() 함수를 사용해서 '안녕하세요!'를 출력하세요.",
          starterCode: "// 여기에 코드를 작성하세요\n",
          solution: "console.log('안녕하세요!')",
          hint: "console.log('여기에 텍스트를 입력하세요')",
        },
      },
      {
        type: "code",
        title: "변수 사용하기",
        description: "변수는 데이터를 저장하는 상자입니다. 내 이름을 저장하고 출력해볼까요?",
        codeChallenge: {
          instruction: "let으로 name 변수를 만들고 당신의 이름을 저장한 뒤, console.log로 출력하세요.",
          starterCode: "// let name = '당신의 이름'\n// console.log(name)\n",
          solution: "let name = '철수'\nconsole.log(name)",
          hint: "let name = '여기에 이름'; 그 다음 console.log(name)",
        },
      },
      {
        type: "code",
        title: "숫자 계산하기",
        description: "프로그래밍으로 계산을 해봅시다. 두 숫자를 더하고 결과를 출력해보세요.",
        codeChallenge: {
          instruction: "10과 20을 더한 결과를 result 변수에 저장하고 출력하세요.",
          starterCode: "// let result = \n",
          solution: "let result = 10 + 20\nconsole.log(result)",
          hint: "let result = 10 + 20; 그리고 console.log(result)",
        },
      },
      {
        type: "code",
        title: "조건문: 성인 판별",
        description: "나이에 따라 다른 메시지를 보여주는 프로그램을 만들어봅시다.",
        codeChallenge: {
          instruction: "age 변수가 18 이상이면 '성인입니다', 아니면 '미성년자입니다'를 출력하세요.",
          starterCode: "let age = 20\n// if문을 사용해보세요\n",
          solution: "let age = 20\nif (age >= 18) {\n  console.log('성인입니다')\n} else {\n  console.log('미성년자입니다')\n}",
          hint: "if (age >= 18) { console.log('성인입니다') } else { console.log('미성년자입니다') }",
        },
      },
      {
        type: "code",
        title: "함수 만들기",
        description: "같은 코드를 반복하지 않고 재사용할 수 있는 함수를 만들어봅시다.",
        codeChallenge: {
          instruction: "이름을 받아서 '안녕하세요, [이름]님!'을 출력하는 greet 함수를 만들고 실행하세요.",
          starterCode: "// function greet(name) {\n//   \n// }\n// greet('철수')\n",
          solution: "function greet(name) {\n  console.log('안녕하세요, ' + name + '님!')\n}\ngreet('철수')",
          hint: "function greet(name) { console.log('안녕하세요, ' + name + '님!') }",
        },
      },
      {
        type: "code",
        title: "배열 다루기",
        description: "여러 데이터를 한 번에 저장하고 관리하는 배열을 배워봅시다.",
        codeChallenge: {
          instruction: "과일 배열을 만들고 첫 번째 과일을 출력하세요. (사과, 바나나, 오렌지)",
          starterCode: "// let fruits = ['사과', '바나나', '오렌지']\n",
          solution: "let fruits = ['사과', '바나나', '오렌지']\nconsole.log(fruits[0])",
          hint: "배열의 첫 번째 요소는 fruits[0]으로 접근합니다",
        },
      },
      {
        type: "code",
        title: "반복문: 모든 항목 출력",
        description: "배열의 모든 항목을 하나씩 출력하는 반복문을 배워봅시다.",
        codeChallenge: {
          instruction: "for문을 사용해서 numbers 배열의 모든 숫자를 출력하세요.",
          starterCode: "let numbers = [1, 2, 3, 4, 5]\n// for문 작성\n",
          solution: "let numbers = [1, 2, 3, 4, 5]\nfor (let i = 0; i < numbers.length; i++) {\n  console.log(numbers[i])\n}",
          hint: "for (let i = 0; i < numbers.length; i++) { console.log(numbers[i]) }",
        },
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
  const [code, setCode] = useState("");
  const [codeOutput, setCodeOutput] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);

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

  // Initialize code when task changes
  useEffect(() => {
    if (currentTaskData?.type === "code" && currentTaskData.codeChallenge) {
      setCode(currentTaskData.codeChallenge.starterCode);
      setCodeOutput([]);
      setShowHint(false);
      setShowResult(false);
      setIsCodeCorrect(false);
    }
  }, [currentTask, currentTaskData]);

  const runCode = () => {
    const outputs: string[] = [];
    const originalLog = console.log;
    
    // Override console.log to capture output
    console.log = (...args) => {
      outputs.push(args.join(" "));
    };
    
    try {
      // eslint-disable-next-line no-eval
      eval(code);
      setCodeOutput(outputs);
    } catch (error) {
      if (error instanceof Error) {
        setCodeOutput([`❌ 오류: ${error.message}`]);
      }
    } finally {
      console.log = originalLog;
    }
  };

  const checkCodeSolution = () => {
    if (!currentTaskData.codeChallenge) return;
    
    // Run the code first
    runCode();
    
    // Simple check: remove whitespace and compare key parts
    const normalizedCode = code.replace(/\s+/g, "").toLowerCase();
    const normalizedSolution = currentTaskData.codeChallenge.solution.replace(/\s+/g, "").toLowerCase();
    
    // Check if code is similar enough to solution
    const solutionParts = normalizedSolution.split("\n").filter(line => line.trim() !== "");
    const matchCount = solutionParts.filter(part => 
      normalizedCode.includes(part.replace(/['"]/g, ""))
    ).length;
    
    const isCorrect = matchCount >= solutionParts.length * 0.7; // 70% match threshold
    
    setIsCodeCorrect(isCorrect);
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }
    setShowResult(true);
  };

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
      setCodeOutput([]);
      setShowHint(false);
      setIsCodeCorrect(false);
      if (content.tasks[currentTask + 1]?.type === "code" && content.tasks[currentTask + 1].codeChallenge) {
        setCode(content.tasks[currentTask + 1].codeChallenge!.starterCode);
      }
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

          {currentTaskData.type === "code" && currentTaskData.codeChallenge ? (
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">📝 과제:</p>
                <p className="text-sm">{currentTaskData.codeChallenge.instruction}</p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">코드 에디터:</label>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-48 p-4 font-mono text-sm bg-slate-950 text-green-400 rounded-lg border-2 border-border focus:border-primary focus:outline-none"
                  placeholder="여기에 코드를 작성하세요..."
                  spellCheck={false}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={runCode} variant="outline" size="sm">
                  ▶️ 실행하기
                </Button>
                <Button 
                  onClick={() => setShowHint(!showHint)} 
                  variant="ghost" 
                  size="sm"
                >
                  💡 힌트 {showHint ? "숨기기" : "보기"}
                </Button>
              </div>

              {showHint && (
                <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm font-medium text-yellow-900 dark:text-yellow-200">
                    💡 힌트: {currentTaskData.codeChallenge.hint}
                  </p>
                </div>
              )}

              {codeOutput.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-2 block">실행 결과:</label>
                  <div className="bg-slate-950 p-4 rounded-lg border-2 border-border font-mono text-sm">
                    {codeOutput.map((output, i) => (
                      <div key={i} className="text-green-400">
                        {output}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {showResult && (
                <div className={`p-4 rounded-lg ${
                  isCodeCorrect
                    ? "bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100"
                    : "bg-yellow-50 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-100"
                }`}>
                  <p className="font-semibold mb-2">
                    {isCodeCorrect
                      ? "정답입니다! 🎉 코딩을 잘 이해하셨네요!"
                      : "잘 시도했어요! 💪 힌트나 정답을 참고해보세요."}
                  </p>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm font-medium">
                      💡 정답 코드 보기
                    </summary>
                    <pre className="mt-2 p-3 bg-slate-900 rounded text-green-400 text-xs overflow-x-auto">
                      {currentTaskData.codeChallenge.solution}
                    </pre>
                  </details>
                </div>
              )}

              <div className="flex justify-end gap-3">
                {!showResult ? (
                  <Button 
                    onClick={checkCodeSolution}
                    size="lg"
                  >
                    제출하기
                  </Button>
                ) : (
                  <Button onClick={handleNext} size="lg">
                    {isLastTask ? "결과 보기" : "다음 단계"}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {currentTaskData.options?.map((option, index) => (
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
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
