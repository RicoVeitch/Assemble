export interface IAnswer {
  id: string;
  questionId?: string;
  message: string;
  likes: number;
  displayName?: string;
  username?: string;
  createdAt?: Date;
}