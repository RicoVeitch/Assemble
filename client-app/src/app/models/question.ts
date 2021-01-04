import { IAnswer } from "./answer";

export interface IQuestion {
  id: string;
  title: string;
  description: string;
  likes: number;
  liked?: boolean | null;
  date: Date;
  asked?: boolean;
  username?: string;
  displayName?: string;
  answers: IAnswer[];
  categories: string[];
  // Username: string
}


export class QuestionFormValues implements IQuestion {
  id: string = '';
  title: string = '';
  description: string = '';
  likes: number = 0;
  date: Date = new Date();
  liked?: boolean | null = null
  asked?: boolean | undefined = undefined;
  username?: string | undefined = undefined;
  displayName?: string | undefined = undefined;
  answers: IAnswer[] = [];
  categories: string[] = [];

  constructor(init?: QuestionFormValues) {
    Object.assign(this, init);
  }

}

export const categories = [
  { key: 'Biology', text: 'Biology', value: 'Biology' },
  { key: 'Theology', text: 'Theology', value: 'Theology' },
  { key: 'Computer-Science', text: 'Computer-Science', value: 'Computer-Science' },
  { key: 'hardware', text: 'Hardware', value: 'Hardware' },
  { key: 'Economics', text: 'Economics', value: 'Economics' },
  { key: 'History', text: 'History', value: 'History' },
  { key: 'English', text: 'English', value: 'English' }
];