export interface AnalysisResult {
  hookStrategy: string;
  pacing: string;
  tone: string;
  structure: {
    sectionName: string;
    description: string;
    estimatedDuration: string;
  }[];
  viralFactors: string[];
  suggestedTopics: string[]; // AI suggested topics based on the structure
}

export interface GeneratedScript {
  titleCandidates: string[];
  thumbnailIdeas: string[];
  scriptContent: string; // Markdown formatted
}

export enum AppState {
  INPUT = 'INPUT',
  ANALYZING = 'ANALYZING',
  TOPIC_SELECTION = 'TOPIC_SELECTION', // Replaces REVIEW_ANALYSIS for clearer flow
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
}