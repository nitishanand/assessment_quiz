export interface Question {
  title: string;
  options?: string[];
  answer?: any;
  /* min_exp?: number;
  max_exp?: number;
  question_type?: string; */
  role?: string;
  shortrole?: string;
}
