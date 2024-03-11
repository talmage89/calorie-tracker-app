import clsx from 'clsx';
import { JSX, splitProps } from 'solid-js';
import './Spinner.scss';

export type SpinnerProps = JSX.HTMLAttributes<HTMLDivElement> & {
  message?: string;
};

export const Spinner = (props: SpinnerProps) => {
  const [local, rest] = splitProps(props, ['class', 'message']);

  return (
    <div class="Spinner__container">
      <div class={clsx('Spinner', local.class)} {...rest}></div>
      {local.message && <div class="Spinner__message">{local.message}</div>}
    </div>
  );
};
