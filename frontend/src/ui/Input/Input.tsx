import clsx from 'clsx';
import { JSX, mergeProps, splitProps } from 'solid-js';
import './Input.scss';

export type InputSize = 'sm' | 'md' | 'lg';

export type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  filled?: boolean;
  fluid?: boolean;
  iconLeading?: string;
  iconTrailing?: string;
  inputSize?: InputSize; // "size" conflicts with InputHTMLAttributes.size
};

export const Input = (props: InputProps) => {
  props = mergeProps(
    {
      inputSize: 'md',
    } as InputProps,
    props,
  );

  const [local, rest] = splitProps(props, ['class', 'filled', 'fluid', 'iconLeading', 'iconTrailing', 'inputSize']);

  return (
    <div
      class={clsx('Input__container', {
        'Input__container--fluid': local.fluid,
      })}
    >
      {local.iconLeading && <span class="iconLeading material-icons">{local.iconLeading}</span>}
      {local.iconTrailing && <span class="iconTrailing material-icons">{local.iconTrailing}</span>}
      <input
        class={clsx(
          {
            'Input': !local.filled,
            'Input--filled': local.filled,
            'Input--fluid': local.fluid,
            'Input--iconLeading': local.iconLeading,
            'Input--iconTrailing': local.iconTrailing,
            [`Input--size--${local.inputSize}`]: local.inputSize,
          },
          local.class,
        )}
        {...rest}
      />
    </div>
  );
};
