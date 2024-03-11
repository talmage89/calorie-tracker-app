import { useNavigate } from '@solidjs/router';
import { createSignal } from 'solid-js';
import { http } from '~/http';
import { Button, Input } from '~/ui';
import { setUser } from '../../services/UserService';

export type LoginFormData = {
  username: string;
  password: string;
};

export const LoginForm = () => {
  const [form, setForm] = createSignal<LoginFormData>({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  function onSubmit(e: Event) {
    e.preventDefault();
    http
      .post('/api/token-auth/', form())
      .then((res) => {
        setUser(res.data.user);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          fluid
          name="username"
          onChange={(e) => {
            setForm({
              ...form(),
              username: e.target.value,
            });
          }}
          placeholder="Email"
          type="email"
          value={form().username}
        />
        <Input
          class="mt-4"
          fluid
          name="password"
          onChange={(e) => {
            setForm({
              ...form(),
              password: e.target.value,
            });
          }}
          placeholder="Password"
          type="password"
          value={form().password}
        />
        <Button
          class="mt-4"
          color="primary"
          disabled={!form().username || !form().password}
          fluid
          type="submit"
          variant="raised"
        >
          Login
        </Button>
      </form>
    </>
  );
};
