export interface AppState {
  resume: string;
  jobDescription: string;
  apiKey: string;
  isListening: boolean;
  transcribedQuestion: string;
  aiAnswer: string;
  isInPipMode: boolean;
  deepgramApiKey?: string;
}

export interface AppActions {
  setResume: (resume: string) => void;
  setJobDescription: (jobDescription: string) => void;
  setApiKey: (apiKey: string) => void;
  setIsListening: (isListening: boolean) => void;
  setTranscribedQuestion: (question: string) => void;
  setAiAnswer: (answer: string) => void;
  setIsInPipMode: (isInPipMode: boolean) => void;
  resetState: () => void;
}

export interface TranscriptionResult {
  transcript: string;
  isFinal: boolean;
  confidence?: number;
}

export interface GeminiResponse {
  answer: string;
  error?: string;
}

export type AppStore = AppState & AppActions;