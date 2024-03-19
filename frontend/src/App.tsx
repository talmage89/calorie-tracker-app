import { Route, Router } from '@solidjs/router';
import { user } from './features/auth/services/UserService';
import { commonRoutes, publicRoutes, protectedRoutes } from './routes';
import { Navbar } from './components';
import './App.scss';

export const PageWrapper = (props: any) => {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
};

export function App() {
  return (
    <>
      <Router>
        <Route path="/" component={PageWrapper}>
          <>{[...(user() ? protectedRoutes : publicRoutes), ...commonRoutes]}</>
        </Route>
      </Router>
    </>
  );
}
