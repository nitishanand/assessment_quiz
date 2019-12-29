export interface Question {
  id?: number;
  title: string;
  options?: [];
  answer?: any;
  min_exp?: number;
  max_exp?: number;
  question_type?: string;
}
