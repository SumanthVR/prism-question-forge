
export interface Framework {
  id: string;
  name: string;
  questionCount: number;
}

export interface OriginalQuestion {
  text: string;
  framework: string;
}

export interface Question {
  id: string;
  text: string;
  frameworks: string[];
  originalQuestions: OriginalQuestion[];
  emoji?: string;
}

export interface GenerateQuestionsRequest {
  count: number;
  frameworks: string[];
}

export interface GenerateQuestionsResponse {
  questions: Question[];
}
