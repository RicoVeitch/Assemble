export interface IQuestion {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
}

export const categories = [
  { key: 'biology', text: 'biology', value: 'biology' },
  { key: 'theology', text: 'theology', value: 'theology' },
  { key: 'Computer Science', text: 'Computer Science', value: 'Computer Science' },
  { key: 'hardware', text: 'hardware', value: 'hardware' },
  { key: 'economics', text: 'economics', value: 'economics' },
  { key: 'history', text: 'history', value: 'history' }
];