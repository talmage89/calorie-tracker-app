import { Login } from '~/features/auth';
import { Error, Home } from '~/features/core';

export const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '*404',
    component: Error,
  },
];
