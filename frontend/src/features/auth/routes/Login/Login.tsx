import { A, useNavigate } from '@solidjs/router';
import { createSignal } from 'solid-js';
import { http } from '~/http';
import { setUser } from '../../services/UserService';
import { LoginForm } from '../../components';

export const Login = () => {
  const [error, setError] = createSignal<string | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <div class="centerPage">
        <h1 class="text-center">Login</h1>
        <LoginForm
          onSubmit={(data) => {
            http
              .post('/api/token-auth/', { ...data, username: data.email })
              .then((response) => {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                setError(null);
                navigate('/');
              })
              .catch((error) => {
                if (error.response.data?.non_field_errors?.[0]) {
                  setError(error.response.data.non_field_errors[0]);
                } else if (error.message) {
                  setError(error.message);
                } else {
                  setError('An unknown error occurred');
                }
              });
          }}
        />
        {error() && <p>{error()}</p>}
        <p class="mt-8">
          Don't have an account? <A href="/sign-up">Sign Up</A>
        </p>
      </div>
    </>
  );
};
