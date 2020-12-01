import { IAnswer } from "./answer";

export interface IQuestion {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  asked?: boolean;
  answers: IAnswer[];
  // Username: string
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