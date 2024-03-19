import { User } from "../auth/types";

export type Profile = {
    id: string;
    user: User;
    name: string;
    created_at: string;
    updated_at: string;
    weight: number;
    weight_goal: number;
    calorie_goal: number;
    protein_goal: number;
    carb_goal: number;
    fat_goal: number;
  }