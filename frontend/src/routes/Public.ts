import { Login, SignUp} from '~/features/auth';
import { Landing } from '~/features/home';

export const publicRoutes = [
  {
    path: '/',
    component: Landing,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/sign-up',
    component: SignUp,
  },
];
