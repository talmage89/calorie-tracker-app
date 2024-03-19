import { createSignal } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { LoginForm } from '../../components';
import { http } from '~/http';
import { setUser } from '../../services/UserService';

export const SignUp = () => {
  const navigate = useNavigate();

  const [error, setError] = createSignal<string | null>(null);

  async function getToken(data: any) {
    return http
      .post('/api/token-auth/', data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
      })
      .catch((err: any) => {
        setError(err.response.data.non_field_errors[0]);
      });
  }

  return (
    <>
      <div class="centerPage">
        <h1 class="text-center">Sign up</h1>
        <LoginForm
          onSubmit={(data) => {
            http
              .post('/api/users/', data)
              .then(() => getToken({ ...data, username: data.email }).then(() => navigate('/')))
              .catch((err) => setError(err.response.data.non_field_errors[0]));
          }}
        />
        {error() && <p>{error()}</p>}
        <p class="mt-8">
          Already have an account? <A href="/login">Log In</A>
        </p>
      </div>
    </>
  );
};
