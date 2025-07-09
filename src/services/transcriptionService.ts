import { TranscriptionResult } from '../types';

interface DeepgramMessage {
  transcript: string;
  is_final: boolean;
  confidence?: number;
}

class TranscriptionService {
  private websocket: WebSocket | null = null;
  private audioStream: any = null; // Will be from react-native-live-audio-stream
  private isListening: boolean = false;
  private onTranscriptionCallback: ((result: TranscriptionResult) => void) | null = null;
  private deepgramApiKey: string = '';

  constructor(deepgramApiKey: string) {
    this.deepgramApiKey = deepgramApiKey;
  }

  setOnTranscriptionCallback(callback: (result: TranscriptionResult) => void) {
    this.onTranscriptionCallback = callback;
  }

  async startListening(): Promise<boolean> {
    try {
      if (this.isListening) {
        console.log('Already listening');
        return true;
      }

      // Initialize Deepgram WebSocket connection
      const deepgramUrl = `wss://api.deepgram.com/v1/listen?encoding=linear16&sample_rate=16000&channels=1&interim_results=true&endpointing=300&utterance_end_ms=1000&token=${this.deepgramApiKey}`;
      
      this.websocket = new WebSocket(deepgramUrl);

      this.websocket.onopen = () => {
        console.log('Deepgram WebSocket connected');
        this.isListening = true;
        this.startAudioCapture();
      };

      this.websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.channel && data.channel.alternatives && data.channel.alternatives.length > 0) {
            const alternative = data.channel.alternatives[0];
            const transcription: TranscriptionResult = {
              transcript: alternative.transcript,
              isFinal: data.is_final || false,
              confidence: alternative.confidence,
            };

            if (this.onTranscriptionCallback && transcription.transcript.trim()) {
              this.onTranscriptionCallback(transcription);
            }
          }
        } catch (error) {
          console.error('Error parsing Deepgram message:', error);
        }
      };

      this.websocket.onerror = (error) => {
        console.error('Deepgram WebSocket error:', error);
        this.isListening = false;
      };

      this.websocket.onclose = () => {
        console.log('Deepgram WebSocket disconnected');
        this.isListening = false;
      };

      return true;
    } catch (error) {
      console.error('Error starting transcription:', error);
      this.isListening = false;
      return false;
    }
  }

  private startAudioCapture() {
    try {
      // Note: This is a simplified implementation
      // In a real app, you'd use react-native-live-audio-stream or similar
      // to capture audio and send it to the WebSocket
      
      // For now, this is a placeholder that would need to be implemented
      // with proper audio streaming capabilities
      console.log('Audio capture would start here');
      
      // Example of how it would work:
      // this.audioStream = LiveAudioStream.init({
      //   sampleRate: 16000,
      //   channels: 1,
      //   bitsPerSample: 16,
      //   audioSource: 'MIC',
      // });
      
      // this.audioStream.on('data', (data: any) => {
      //   if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      //     this.websocket.send(data);
      //   }
      // });
      
      // this.audioStream.start();
    } catch (error) {
      console.error('Error starting audio capture:', error);
    }
  }

  stopListening() {
    try {
      this.isListening = false;

      if (this.audioStream) {
        // this.audioStream.stop();
        this.audioStream = null;
      }

      if (this.websocket) {
        this.websocket.close();
        this.websocket = null;
      }

      console.log('Transcription stopped');
    } catch (error) {
      console.error('Error stopping transcription:', error);
    }
  }

  isCurrentlyListening(): boolean {
    return this.isListening;
  }

  updateApiKey(apiKey: string) {
    this.deepgramApiKey = apiKey;
  }
}

export { TranscriptionService };