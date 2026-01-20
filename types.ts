
export interface Question {
  id: string;
  text: string;
}

export interface Category {
  id: string;
  title: string;
  weight: number;
  questions: Question[];
}

export interface Response {
  score: number; // 0-5
  canImprove: boolean;
  action?: string;
  deadline?: string;
  responsible?: string;
}

export interface ProjectData {
  projectName: string;
  clientName: string;
  mafResponses: Record<string, Response>;
  ikiResponses: Record<string, Response>;
}

export enum TabType {
  DASHBOARD = 'DASHBOARD',
  MAF = 'MAF',
  IKI = 'IKI',
  ACTION_PLAN = 'ACTION_PLAN'
}

export type PerformanceLevel = 'Forte' | 'Viável' | 'Fraco' | 'Inadequado';
