export interface Question {
  id?: number;
  title: string;
  options?: [];
  min_exp?: number;
  max_exp?: number;
  question_type?: string;
}
