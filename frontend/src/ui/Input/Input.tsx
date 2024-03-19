import clsx from 'clsx';
import { JSX, splitProps } from 'solid-js';
import './Input.scss';

export type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  filled?: boolean;
  fluid?: boolean;
};

export const Input = (props: InputProps) => {
  const [local, rest] = splitProps(props, ['class', 'filled', 'fluid']);

  return (
    <div
      class={clsx('Input__container', {
        'Input__container--fluid': local.fluid,
      })}
    >
      <input
        class={clsx(
          {
            'Input': !local.filled,
            'Input--filled': local.filled,
            'Input--fluid': local.fluid,
          },
          local.class,
        )}
        {...rest}
      />
    </div>
  );
};
