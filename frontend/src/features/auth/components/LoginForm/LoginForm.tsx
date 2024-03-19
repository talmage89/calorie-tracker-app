import { createSignal } from 'solid-js';

type LoginFormProps = {
  onSubmit: (data: LoginFormData) => void;
}

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
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          onChange={(e) => {
            setForm({
              ...form(),
              email: e.target.value,
            });
          }}
          placeholder="email"
          type="email"
          value={form().email}
        />
        <input
          class="mt-4"
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
        <button class="mt-4" disabled={!form().email || !form().password} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
