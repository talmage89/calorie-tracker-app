import { createSignal } from 'solid-js';
import { Button, Input } from '~/ui';
import './LoginForm.scss';

type LoginFormProps = {
  onSubmit: (data: LoginFormData) => void;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export const LoginForm = (props: LoginFormProps) => {
  const [form, setForm] = createSignal<LoginFormData>({
    email: '',
    password: '',
  });

  function onSubmit(e: Event) {
    e.preventDefault();
    props.onSubmit(form());
  }

  return (
    <form onSubmit={onSubmit} class="LoginForm">
      <div class="LoginForm__input">
        <p>Email Address</p>
        <Input
          fluid
          name="email"
          placeholder="email"
          type="email"
          value={form().email}
          onChange={(e) => setForm({ ...form(), email: e.target.value })}
        />
      </div>
      <div class="LoginForm__input">
        <p>Password</p>
        <Input
          name="password"
          fluid
          placeholder="Password"
          type="password"
          value={form().password}
          onChange={(e) => setForm({ ...form(), password: e.target.value })}
        />
      </div>
      <Button fluid static variant="raised" class="mt-4" disabled={!form().email || !form().password} type="submit">
        Continue
      </Button>
    </form>
  );
};
