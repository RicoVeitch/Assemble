import { IAnswer } from "./answer";

export interface IQuestion {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  asked?: boolean;
  username?: string;
  displayName?: string;
  answers: IAnswer[];
  // Username: string
}


export class QuestionFormValues implements IQuestion {
  id: string = '';
  title: string = '';
  description: string = '';
  category: string = '';
  date: string = '';
  asked?: boolean | undefined = undefined;
  username?: string | undefined = undefined;
  displayName?: string | undefined = undefined;
  answers: IAnswer[] = [];

  constructor(init?: QuestionFormValues) {
    Object.assign(this, init);
  }

}

export const categories = [
  { key: 'Biology', text: 'Biology', value: 'Biology' },
  { key: 'Theology', text: 'Theology', value: 'Theology' },
  { key: 'Computer Science', text: 'Computer Science', value: 'Computer Science' },
  { key: 'hardware', text: 'hardware', value: 'Hardware' },
  { key: 'Economics', text: 'Economics', value: 'Economics' },
  { key: 'History', text: 'History', value: 'History' },
  { key: 'English', text: 'English', value: 'English' }
];