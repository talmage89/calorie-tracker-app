import { JSX, splitProps } from 'solid-js';
import clsx from 'clsx';
import './Input.scss';

export type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  fluid?: boolean;
};

export const Input = (props: InputProps) => {
  const [local, rest] = splitProps(props, ['class', 'fluid']);

  return (
    <div
      class={clsx('Input__container', {
        'Input__container--fluid': local.fluid,
      })}
    >
      <input
        class={clsx(
          'Input',
          {
            'Input--fluid': local.fluid,
          },
          local.class,
        )}
        {...rest}
      />
    </div>
  );
};
