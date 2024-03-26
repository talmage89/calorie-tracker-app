import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { http } from '~/http';
import { Container } from '~/ui';
import { setUser } from '../../services/UserService';
import { LoginForm } from '../../components';
import './Login.scss';

export const Login = () => {
  const [error, setError] = createSignal<string | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <Container class="Login">
        <div class="Login__content shadow-sm">
          <h2 class="">Login</h2>
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
          {error() && <p class='Login__content__error'>{error()}</p>}
          <p>
            Don't have an account? <a href="/sign-up">Sign Up</a>
          </p>
        </div>
      </Container>
    </>
  );
};
