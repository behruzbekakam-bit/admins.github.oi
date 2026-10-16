// Uzbek Voice Lab Audio & Speech Synthesis Engine

export interface VoiceEngineOptions {
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
  voiceName?: string;
  useServerTTS?: boolean;
}

class UzbekVoiceLabEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentAudioElement: HTMLAudioElement | null = null;
  private recognition: any = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  // Get available browser voices
  public getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  // Find best matching voice for Uzbek / Central Asian context
  public getBestVoice(preferredName?: string): SpeechSynthesisVoice | null {
    const voices = this.getVoices();
    if (!voices.length) return null;

    if (preferredName) {
      const found = voices.find(v => v.name === preferredName);
      if (found) return found;
    }

    // Look for Uzbek, Turkish, Russian or clean Google/Microsoft voices
    const uzVoice = voices.find(v => v.lang.startsWith('uz') || v.name.toLowerCase().includes('uzbek'));
    if (uzVoice) return uzVoice;

    const trVoice = voices.find(v => v.lang.startsWith('tr') || v.name.toLowerCase().includes('turkish'));
    if (trVoice) return trVoice;

    const ruVoice = voices.find(v => v.lang.startsWith('ru') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Yandex')));
    if (ruVoice) return ruVoice;

    const generalRu = voices.find(v => v.lang.startsWith('ru'));
    if (generalRu) return generalRu;

    // Default to natural Google or Microsoft English
    const naturalEn = voices.find(v => v.name.includes('Natural') || v.name.includes('Online'));
    return naturalEn || voices[0] || null;
  }

  // Speak text with high quality speech engine
  public async speak(text: string, options: VoiceEngineOptions = {}): Promise<void> {
    this.stop();

    const {
      rate = 1.0,
      pitch = 1.0,
      onStart,
      onEnd,
      onError,
      voiceName,
      useServerTTS = false
    } = options;

    // If server-side Gemini TTS is requested, call backend
    if (useServerTTS) {
      try {
        if (onStart) onStart();
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, voiceName: 'Kore' }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.audioDataUrl) {
            const audio = new Audio(data.audioDataUrl);
            this.currentAudioElement = audio;
            audio.onended = () => {
              this.currentAudioElement = null;
              if (onEnd) onEnd();
            };
            audio.onerror = (e) => {
              this.currentAudioElement = null;
              if (onError) onError(e);
            };
            await audio.play();
            return;
          }
        }
      } catch (err) {
        console.warn('Server TTS failed, falling back to Web Speech API', err);
      }
    }

    // Web Speech API fallback / standard
    if (!this.synth) {
      if (onError) onError(new Error("Brauzerda ovoz sintezi mavjud emas"));
      return;
    }

    // Clean text for speech
    const cleanText = text
      .replace(/[*#`_~\[\]]/g, '')
      .replace(/📌 Qonuniy asoslar:.*/s, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = rate;
    utterance.pitch = pitch;

    const bestVoice = this.getBestVoice(voiceName);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (event) => {
      this.currentUtterance = null;
      if (onError) onError(event);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  // Stop current speech playback
  public stop(): void {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement.currentTime = 0;
      this.currentAudioElement = null;
    }
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  // Initialize Speech Recognition for microphone
  public createSpeechRecognizer(
    onResult: (text: string, isFinal: boolean) => void,
    onError: (err: any) => void,
    onStateChange?: (isListening: boolean) => void
  ) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return null;
    }

    const recognizer = new SpeechRecognition();
    recognizer.continuous = false;
    recognizer.interimResults = true;
    recognizer.lang = 'uz-UZ'; // Primary Uzbek

    recognizer.onstart = () => {
      if (onStateChange) onStateChange(true);
    };

    recognizer.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      if (final) {
        onResult(final, true);
      } else if (interim) {
        onResult(interim, false);
      }
    };

    recognizer.onerror = (event: any) => {
      if (onError) onError(event);
      if (onStateChange) onStateChange(false);
    };

    recognizer.onend = () => {
      if (onStateChange) onStateChange(false);
    };

    return recognizer;
  }
}

export const voiceLab = new UzbekVoiceLabEngine();
