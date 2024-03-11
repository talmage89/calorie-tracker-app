import { A } from '@solidjs/router';
import { Card, Container } from '~/ui';
import { LoginForm } from '../../components';

export const Login = () => {
  return (
    <>
      <Container>
        <div class="centerPage">
          <Card>
            <h1 class="text-center">Login</h1>
            <LoginForm />
            <A class="block text-center mt-8" href="/forgot-password">
              Forgot Password?
            </A>
            <p class="mt-8">
              Don't have an account? <A href="/sign-up">Sign Up</A>
            </p>
          </Card>
        </div>
      </Container>
    </>
  );
};
