# 🎬 ViralScripter - AI 유튜브 대본 생성기

성공한 유튜브 영상의 구조를 분석하고, 그 성공 공식을 새로운 주제에 적용하여 바이럴 대본을 자동 생성하는 AI 도구입니다.

## ✨ 주요 기능

### 1️⃣ 대본 분석 (Transcript Analysis)
- 성공한 유튜브 영상 대본을 AI가 심층 분석
- 후킹 전략, 페이스, 톤앤매너, 구조 파악
- 바이럴 핵심 요소 추출

### 2️⃣ 주제 추천 (Topic Suggestion)
- 분석한 구조에 어울리는 새로운 주제 5가지 자동 추천
- 직접 주제 입력도 가능

### 3️⃣ 대본 생성 (Script Generation)
- 성공 공식을 새로운 주제에 적용
- 제목 후보 3가지 자동 생성
- 썸네일 아이디어 3가지 제공
- 마크다운 형식의 완성된 대본 제공

## 🚀 시작하기

### 필수 요구사항
- Node.js 18 이상
- Google Gemini API 키 ([발급받기](https://aistudio.google.com/app/apikey))

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/ooooouu16-ship-it/youtube-auto.git
cd youtube-auto

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 접속
```

### 프로덕션 빌드

```bash
npm run build
npm run preview
```

## 🌐 배포

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com) 계정 생성
2. GitHub 저장소 연결
3. 자동 배포 완료!

또는 Vercel CLI 사용:

```bash
npm install -g vercel
vercel
```

## 🔑 API 키 관리

- 첫 실행 시 Gemini API 키 입력 화면 표시
- "기억하기" 체크 시 브라우저 localStorage에 안전하게 저장
- 매번 입력할 필요 없이 편리하게 사용 가능

## 🛠 기술 스택

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (gemini-3-pro-preview)
- **Deployment**: Vercel

## 📁 프로젝트 구조

```
youtube-auto/
├── components/          # React 컴포넌트
│   ├── ApiKeyManager.tsx       # API 키 관리
│   ├── InputSection.tsx        # 대본 입력
│   ├── AnalysisResultView.tsx  # 분석 결과 표시
│   ├── GeneratedScriptView.tsx # 생성된 대본 표시
│   └── StepIndicator.tsx       # 진행 단계 표시
├── services/           # 비즈니스 로직
│   └── geminiService.ts        # Gemini API 통신
├── App.tsx            # 메인 앱 컴포넌트
├── types.ts           # TypeScript 타입 정의
├── vite.config.ts     # Vite 설정
└── vercel.json        # Vercel 배포 설정
```

## 🎯 사용 방법

1. **API 키 설정**: Google AI Studio에서 발급받은 API 키 입력
2. **대본 분석**: 성공한 유튜브 영상 대본 붙여넣기
3. **주제 선택**: AI가 추천한 주제 중 선택 또는 직접 입력
4. **대본 생성**: 완성된 대본 확인 및 복사

## 📝 라이선스

MIT License

## 👨‍💻 개발자

Created by [@ooooouu16-ship-it](https://github.com/ooooouu16-ship-it)

---

**Made with ❤️ using Google Gemini AI**

