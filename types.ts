
export interface VisualStep {
  step: number;
  description: string;
  state: string;
}

export interface InterviewLevel {
  problem: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  edgeCases: string[];
  interviewQuestions: string[];
}

export interface SeniorLevel {
  quality: string;
  designTradeoffs: string;
  scalability: string;
  maintenance: string;
}

export interface CodeAnalysis {
  language: string;
  beginnerExplanation: string;
  interviewLevel: InterviewLevel;
  seniorLevel: SeniorLevel;
  optimizations: string[];
  visualSteps: VisualStep[];
}

export enum AnalysisLevel {
  BEGINNER = 'Beginner',
  INTERVIEW = 'Interview',
  SENIOR = 'Senior Engineer',
  VISUAL = 'Visualizer'
}
