import { McqQuestionOption } from "./TaskType";

export type QuizQuestionType = {
  id: number;
  title: string;
  options: McqQuestionOption[];
};

export type QuizTaskContentType = {
  questionnaires: QuizQuestionType[];
};

export type QuizSubmitRequestType = {
  answers: Record<number, number>;
  total_time_spent: number;
};

export type QuizQuestionResultType = {
  id: number;
  title: string;
  options: McqQuestionOption[];
  solution: McqQuestionOption;
  explanation: string;
  user_answer_option_id: number | null;
  is_correct: boolean;
};

export type QuizSubmitResponseType = {
  task_id: string; // UUID
  status: string;
  total_questions: number;
  total_correct: number;
  score_percentage: number;
  passed: boolean;
  pass_threshold: number;
  total_time_spent: number;
  questions: QuizQuestionResultType[];
};
