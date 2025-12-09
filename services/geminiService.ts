import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, GeneratedScript } from "../types";

// We use gemini-3-pro-preview for complex structural analysis and creative writing
const MODEL_NAME = "gemini-3-pro-preview";

export const analyzeTranscript = async (transcript: string, apiKey: string): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey });
  const prompt = `
    다음 유튜브 영상 대본을 분석해주세요.
    이 영상이 성공하거나 바이럴이 된 이유를 구조적으로 해체하여 분석해야 합니다.
    후킹 전략(Hook), 페이스(Pacing), 톤앤매너(Tone), 그리고 구조적 블록(Structure)에 집중하세요.
    
    또한, 이 영상의 형식과 구조를 활용했을 때 잘 어울릴만한 '새로운 주제' 5가지를 추천해주세요.
    
    대본:
    "${transcript.substring(0, 20000)}" 
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      systemInstruction: "당신은 전문 유튜브 전략가이자 대본 분석가입니다. 바이럴 영상의 성공 공식을 철저히 분석하고 한국어로 답변합니다.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hookStrategy: { type: Type.STRING, description: "초반 30초 동안 시청자를 사로잡는 전략" },
          pacing: { type: Type.STRING, description: "속도감, 편집 리듬, 정보 밀도 분석" },
          tone: { type: Type.STRING, description: "감정적 품질 및 화자의 태도" },
          structure: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                sectionName: { type: Type.STRING },
                description: { type: Type.STRING, description: "해당 섹션의 개념적 설명" },
                estimatedDuration: { type: Type.STRING, description: "예: '0:00-0:30'" }
              }
            }
          },
          viralFactors: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "바이럴이 된 심리적 트리거 또는 핵심 요소 3-5가지" 
          },
          suggestedTopics: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "이 영상의 구조를 적용하기 좋은 새로운 주제 아이디어 5가지"
          }
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("대본 분석에 실패했습니다.");
  }

  return JSON.parse(response.text) as AnalysisResult;
};

export const generateViralScript = async (
  analysis: AnalysisResult,
  topic: string,
  apiKey: string,
  additionalNotes: string = ""
): Promise<GeneratedScript> => {
  const ai = new GoogleGenAI({ apiKey });
  
  const analysisContext = JSON.stringify(analysis);

  const prompt = `
    당신은 세계적인 수준의 유튜브 대본 작가입니다.
    
    [소스 DNA (성공한 바이럴 영상 분석 데이터)]
    ${analysisContext}

    [당신의 임무]
    위의 '소스 DNA' (구조, 페이스, 후킹 전략, 톤)를 완벽하게 적용하여,
    다음 주제에 대한 완전히 새로운 대본을 작성하세요: "${topic}".
    
    [필수 지침]
    1. 예전 텍스트를 단순히 복사하지 말고, 그 '성공 공식'과 '구조'를 새로운 주제에 적용하세요.
    2. 한국어로 작성하세요.
    3. 클릭을 부르는 매력적인 제목 후보 3가지를 제안하세요.
    4. 썸네일 아이디어 3가지를 제안하세요.
    5. 대본 내용은 마크다운 형식으로 작성하며, 시각적 연출(Visual Cue)은 [대괄호] 안에, 오디오 대사는 그대로 작성하세요.
    ${additionalNotes ? `6. 추가 요청사항: ${additionalNotes}` : ''}
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          titleCandidates: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          thumbnailIdeas: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          scriptContent: {
            type: Type.STRING,
            description: "마크다운 형식의 전체 대본"
          }
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("대본 생성에 실패했습니다.");
  }

  return JSON.parse(response.text) as GeneratedScript;
};