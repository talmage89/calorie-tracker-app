import { User } from '../auth/types';

export type Food = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  user: User;
  created_at: string;
  updated_at: string;
};

export type Day = {
  id: string;
  date: string;
  user: User;
  created_at: string;
  updated_at: string;
  entries: Entry[];
};

export type Entry = {
  id: string;
  day: Day;
  food: Food;
  quantity: number;
};
