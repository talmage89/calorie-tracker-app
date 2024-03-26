import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { http } from '~/http';
import { Container } from '~/ui';
import { setUser } from '../../services/UserService';
import { LoginForm } from '../../components';
import './SignUp.scss';

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
      <Container class="SignUp">
        <div class="SignUp__content shadow-sm">
          <h2>Create an account</h2>
          <LoginForm
            onSubmit={(data) => {
              http
                .post('/api/users/', data)
                .then(() => getToken({ ...data, username: data.email }).then(() => navigate('/')))
                .catch((err) => setError(err.response.data.non_field_errors[0]));
            }}
          />
          {error() && <p class='SignUp__content__error'>{error()}</p>}
          <p>
            Already have an account? <a href="/login">Log In</a>
          </p>
        </div>
      </Container>
    </>
  );
};
