import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/appStore';
import { TranscriptionService } from '../services/transcriptionService';
import { aiService } from '../services/aiService';

export const useInterviewMode = () => {
  const {
    isListening,
    transcribedQuestion,
    resume,
    jobDescription,
    apiKey,
    deepgramApiKey,
    setIsListening,
    setTranscribedQuestion,
    setAiAnswer,
  } = useAppStore();

  const transcriptionServiceRef = useRef<TranscriptionService | null>(null);

  // Initialize services when API keys are available
  useEffect(() => {
    if (apiKey) {
      aiService.initializeGemini(apiKey);
    }
  }, [apiKey]);

  // Handle question detection and AI answer generation
  useEffect(() => {
    const processQuestion = async () => {
      if (!transcribedQuestion.trim()) return;

      // Simple question detection - check if it ends with a question mark
      const isQuestion = transcribedQuestion.trim().endsWith('?');
      
      if (isQuestion && resume && jobDescription && aiService.isInitialized()) {
        try {
          const response = await aiService.getGeminiAnswer(
            transcribedQuestion,
            resume,
            jobDescription
          );

          if (response.answer) {
            setAiAnswer(response.answer);
          } else if (response.error) {
            console.error('AI Service Error:', response.error);
            setAiAnswer('Error generating answer. Please try again.');
          }
        } catch (error) {
          console.error('Error processing question:', error);
          setAiAnswer('Error processing question. Please check your API key.');
        }
      }
    };

    processQuestion();
  }, [transcribedQuestion, resume, jobDescription]);

  const startListening = async (): Promise<boolean> => {
    try {
      if (!deepgramApiKey) {
        console.error('Deepgram API key not provided');
        return false;
      }

      // Initialize transcription service
      transcriptionServiceRef.current = new TranscriptionService(deepgramApiKey);
      
      // Set up transcription callback
      transcriptionServiceRef.current.setOnTranscriptionCallback((result) => {
        if (result.isFinal && result.transcript.trim()) {
          setTranscribedQuestion(result.transcript.trim());
        }
      });

      // Start listening
      const success = await transcriptionServiceRef.current.startListening();
      if (success) {
        setIsListening(true);
      }

      return success;
    } catch (error) {
      console.error('Error starting listening:', error);
      return false;
    }
  };

  const stopListening = () => {
    try {
      if (transcriptionServiceRef.current) {
        transcriptionServiceRef.current.stopListening();
        transcriptionServiceRef.current = null;
      }
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping listening:', error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  return {
    startListening,
    stopListening,
    isListening,
  };
};