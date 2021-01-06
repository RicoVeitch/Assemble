export interface IAnswer {
  id: string;
  questionId?: string;
  message: string;
  likes: number;
  liked?: boolean | null;
  disliked?: boolean;
  displayName?: string;
  username?: string;
  createdAt?: Date;
}