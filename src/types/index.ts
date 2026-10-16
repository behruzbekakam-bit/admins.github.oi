export type DeviceMode = 'desktop' | 'mobile' | 'tablet';

export type LanguageCode = 'uz-latn' | 'uz-cyrl' | 'ru' | 'en' | 'tr';

export interface Message {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: number;
  country?: string;
  articlesCited?: string[];
  audioBase64?: string;
  isStreaming?: boolean;
}

export interface CountryJurisdiction {
  id: string;
  name: string;
  flag: string;
  currency: string;
  code: string;
  description: string;
  hotlines: {
    title: string;
    phone: string;
    desc: string;
  }[];
  criticalLaws: {
    code: string;
    name: string;
    keyArticles: string;
  }[];
  commonScenarios: {
    id: string;
    title: string;
    problem: string;
    solutionTips: string;
    recommendedQuestion: string;
  }[];
}

export interface DocumentField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'number' | 'select';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  defaultValue?: string;
  description?: string;
}

export interface DocumentTemplate {
  id: string;
  title: string;
  category: 'court' | 'contract' | 'power_of_attorney' | 'migrant' | 'application' | 'custom';
  description: string;
  jurisdiction: string;
  legalBasis: string;
  fields: DocumentField[];
  sampleResult?: string;
  isCustom?: boolean;
}

export interface DocumentAnalysisResult {
  safetyScore: number; // 0 - 100
  verdict: 'safe' | 'caution' | 'dangerous';
  verdictText: string;
  summary: string;
  risks: {
    clauseNumber?: string;
    title: string;
    riskDescription: string;
    severity: 'high' | 'medium' | 'low';
    recommendation: string;
  }[];
  unfairTerms: string[];
  illegalTerms: string[];
  legalAdvice: string[];
  applicableLaws: string[];
}

export interface VoiceConfigState {
  engine: 'browser' | 'gemini-tts' | 'voicelab';
  speed: number;
  pitch: number;
  autoSpeak: boolean;
  selectedVoiceName: string;
}

export interface AppAdminState {
  isLocked: boolean;
  pinHash: string; // for securing admin controls
}
