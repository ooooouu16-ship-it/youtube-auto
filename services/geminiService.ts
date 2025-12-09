import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, GeneratedScript } from "../types";

// Initialize Gemini Client
let ai: GoogleGenAI;

export const setApiKey = (apiKey: string) => {
  ai = new GoogleGenAI({ apiKey });
};

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    hookStrategy: {
      type: Type.STRING,
      description: "초반 30초 동안 시청자를 사로잡은 구체적인 기술 (예: '호기심 유발', '결론부터 제시', '논란이 될 만한 발언'). 한국어로 작성.",
    },
    pacing: {
      type: Type.STRING,
      description: "편집 및 화법의 리듬 (예: '빠른 컷 편집', '느리고 진지한 빌드업'). 한국어로 작성.",
    },
    tone: {
      type: Type.STRING,
      description: "화자의 감정적 톤 (예: '하이 텐션', '차분함', '교육적', '비꼬는 듯한'). 한국어로 작성.",
    },
    structure: {
      type: Type.STRING,
      description: "이야기의 구성 방식 (예: '문제-심화-해결', '반전이 있는 리스트', '영웅의 여정'). 한국어로 작성.",
    },
    retentionTechniques: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "시청 지속 시간을 늘리기 위한 3-5가지 구체적인 장치 (예: '열린 결말', '시각적 패턴 방해'). 한국어로 작성.",
    },
    audienceTrigger: {
      type: Type.STRING,
      description: "타겟 시청자를 자극하는 핵심 심리 (예: 'FOMO', '탐욕', '실패에 대한 두려움', '동경'). 한국어로 작성.",
    },
    suggestedTopics: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "이 영상의 구조와 스타일을 적용했을 때 대박이 날 만한 3가지 새로운 주제 추천 (예: '주식 투자 실패 썰', '자취 요리 꿀팁').",
    },
  },
  required: ["hookStrategy", "pacing", "tone", "structure", "retentionTechniques", "audienceTrigger", "suggestedTopics"],
};

const scriptSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "클릭을 유도하는 매력적인 유튜브 제목." },
    thumbnailIdea: { type: Type.STRING, description: "높은 클릭률(CTR)을 위한 썸네일 컨셉 설명." },
    scriptContent: { type: Type.STRING, description: "전체 영상 대본 (Markdown 형식, 섹션 헤더 포함: 훅, 인트로, 본론, CTA 등)." },
  },
  required: ["title", "thumbnailIdea", "scriptContent"],
};

export const analyzeTranscript = async (transcript: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `이 유튜브 영상 대본을 분석해서 왜 '떡상(viral)'했는지 구조적, 심리적 요소를 파악해줘. 그리고 이 구조를 적용하기 좋은 새로운 주제들을 추천해줘. 반드시 한국어로 답변해.\n\n대본:\n${transcript}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "너는 유튜브 알고리즘 및 콘텐츠 전략 전문가야. 대박 난 영상의 DNA를 분석해서 명확한 인사이트를 한국어로 제공해.",
      },
    });

    if (!response.text) throw new Error("No response from Gemini");
    return JSON.parse(response.text) as AnalysisResult;
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};

export const generateViralScript = async (
  analysis: AnalysisResult,
  newTopic: string
): Promise<GeneratedScript> => {
  try {
    const prompt = `
      유튜브 마스터로서 행동해.
      
      나는 다음과 같은 성공 DNA를 가진 바이럴 영상을 분석했어:
      - 훅(Hook) 전략: ${analysis.hookStrategy}
      - 톤앤매너: ${analysis.tone}
      - 구조: ${analysis.structure}
      - 페이스: ${analysis.pacing}
      - 시청 지속 장치: ${analysis.retentionTechniques.join(", ")}
      
      너의 임무는 위 '성공 공식'을 그대로 적용하여, 다음 주제에 대한 새로운 대본을 작성하는 거야: "${newTopic}".
      
      **필수 지침:**
      1. 분석된 **훅 전략**과 **구조**를 반드시 따라야 해.
      2. 주제는 다르지만, 원본 영상의 **에너지와 몰입감**을 유지해.
      3. [괄호] 안에 편집 지점이나 시각 자료에 대한 지시사항을 포함해.
      4. 시청 지속 시간을 최대화할 수 있도록 흥미진진하게 작성해.
      5. 반드시 **한국어**로 작성해.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: scriptSchema,
      },
    });

    if (!response.text) throw new Error("No response from Gemini");
    return JSON.parse(response.text) as GeneratedScript;
  } catch (error) {
    console.error("Generation failed:", error);
    throw error;
  }
};