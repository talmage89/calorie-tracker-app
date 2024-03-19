import { BaseModel } from '~/http';
import { Day, Food, Entry } from '../types';

export const DayModel = new BaseModel<Day>('/api/days/');
export const FoodModel = new BaseModel<Food>('/api/foods/');
export const EntryModel = new BaseModel<Entry>('/api/entries/');
