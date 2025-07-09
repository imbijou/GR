import { create } from 'zustand';
import { AppStore } from '../types';

export const useAppStore = create<AppStore>((set, get) => ({
  // Initial state
  resume: '',
  jobDescription: '',
  apiKey: '',
  isListening: false,
  transcribedQuestion: '',
  aiAnswer: '',
  isInPipMode: false,
  deepgramApiKey: '5ddad3b35a30c7b7f6cd7585a038ddbcb08fa795', // Your Deepgram API key

  // Actions
  setResume: (resume: string) => set({ resume }),
  setJobDescription: (jobDescription: string) => set({ jobDescription }),
  setApiKey: (apiKey: string) => set({ apiKey }),
  setIsListening: (isListening: boolean) => set({ isListening }),
  setTranscribedQuestion: (question: string) => set({ transcribedQuestion: question }),
  setAiAnswer: (answer: string) => set({ aiAnswer: answer }),
  setIsInPipMode: (isInPipMode: boolean) => set({ isInPipMode }),
  
  resetState: () => set({
    resume: '',
    jobDescription: '',
    apiKey: '',
    isListening: false,
    transcribedQuestion: '',
    aiAnswer: '',
    isInPipMode: false,
  }),
}));