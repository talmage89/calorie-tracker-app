import clsx from 'clsx';
import { JSX, splitProps } from 'solid-js';
import '../Input/Input.scss';

export type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement> & {
  filled?: boolean;
  fluid?: boolean;
};

export const Select = (props: SelectProps) => {
  const [local, rest] = splitProps(props, ['class', 'filled', 'fluid']);

  return (
    <>
      <div
        class={clsx('Input__container', {
          'Input__container--fluid': local.fluid,
        })}
      >
        <select
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
    </>
  );
};
