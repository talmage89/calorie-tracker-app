import { Error } from '~/features/core';

export const commonRoutes = [
  {
    path: '*404',
    component: Error,
  },
];
