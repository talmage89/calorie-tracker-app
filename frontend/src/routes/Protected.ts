import { Home } from '~/features/home';
import { Profile } from '~/features/profile';

export const protectedRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/profile',
    component: Profile,
  },
];
