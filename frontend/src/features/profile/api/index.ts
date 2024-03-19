import { BaseModel } from "~/http";
import { Profile } from "../types";

export const ProfileModel = new BaseModel<Profile>('/api/profiles/');