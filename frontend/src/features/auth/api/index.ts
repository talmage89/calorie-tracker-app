import { BaseModel } from '~/http';
import { User } from '../types';

export const UserModel = new BaseModel<User>('/api/users/');
