export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category?: string[];
  description?: string;
  examples?: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints?: string[];
  starterCode?: {
    javascript: string;
    python: string;
  };
}

export interface TestResult {
  testCase: number;
  input: any[];
  expected: any;
  output: any;
  passed: boolean;
  error?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  points: number;
  solvedProblems?: number[];
  solvedCount?: number;
  recentSubmissions?: Submission[];
}

export interface Submission {
  id: number;
  problem_id: number;
  code: string;
  language: string;
  status: string;
  runtime?: number;
  memory?: number;
  submitted_at: string;
}