import { Router } from '@solidjs/router';
import './App.scss';
import { routes } from './routes';

export function App() {
  return (
    <>
      <Router>{routes}</Router>
    </>
  );
}
