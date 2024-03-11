import { createSignal } from 'solid-js';
import { User } from '../types';
import { UserModel } from '../api';

export const [user, setUser] = createSignal<User>();

UserModel.listAction('me', 'get')
  .then((res) => {
    setUser(res.data);
  })
  .catch(() => {
    setUser(undefined);
  });
