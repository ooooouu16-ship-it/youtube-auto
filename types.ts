export interface AnalysisResult {
  hookStrategy: string;
  pacing: string;
  tone: string;
  structure: string;
  retentionTechniques: string[];
  audienceTrigger: string;
  suggestedTopics: string[];
}

export interface GeneratedScript {
  title: string;
  thumbnailIdea: string;
  scriptContent: string; // Markdown formatted
}

export enum AppStep {
  INPUT = 'INPUT',
  ANALYZING = 'ANALYZING',
  REVIEW = 'REVIEW',
  GENERATING = 'GENERATING',
  RESULT = 'RESULT'
}