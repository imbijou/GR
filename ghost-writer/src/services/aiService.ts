import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiResponse } from '../types';

class AIService {
  private genAI: GoogleGenerativeAI | null = null;

  constructor() {
    // Will be initialized when API key is provided
  }

  initializeGemini(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async getGeminiAnswer(
    question: string,
    resume: string,
    jobDescription: string
  ): Promise<GeminiResponse> {
    try {
      if (!this.genAI) {
        throw new Error('Gemini AI not initialized. Please provide an API key.');
      }

      const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `
You are an expert career coach and interview assistant. You have access to the candidate's resume and the job description they're interviewing for.

**CANDIDATE'S RESUME:**
${resume}

**JOB DESCRIPTION:**
${jobDescription}

**INTERVIEWER'S QUESTION:**
${question}

**INSTRUCTIONS:**
- Provide a concise, professional answer that highlights relevant experience from the resume
- Tailor the response specifically to the job requirements
- Keep the answer between 1-2 minutes when spoken (150-300 words)
- Use specific examples from the resume when possible
- Sound natural and conversational, not scripted
- Focus on demonstrating value and fit for the role

**ANSWER:**`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const answer = response.text();

      return {
        answer: answer.trim(),
      };
    } catch (error) {
      console.error('Error generating Gemini response:', error);
      return {
        answer: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  isInitialized(): boolean {
    return this.genAI !== null;
  }
}

export const aiService = new AIService();