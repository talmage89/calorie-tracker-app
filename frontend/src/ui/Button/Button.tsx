import clsx from 'clsx';
import { JSX, mergeProps, splitProps } from 'solid-js';
import './Button.scss';

export type ButtonVariant = 'default' | 'raised' | 'outlined';

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  fluid?: boolean;
  rounded?: boolean;
  variant?: ButtonVariant;
};

export function Button(props: ButtonProps) {
  props = mergeProps({ type: 'button', variant: 'default' } as ButtonProps, props);

  const [local, rest] = splitProps(props, ['class', 'children', 'fluid', 'rounded', 'type', 'variant']);

  return (
    <button
      class={clsx(
        {
          'Button--fluid': local.fluid,
          'Button--rounded': local.rounded,
          [`Button--variant--${local.variant}`]: local.variant,
        },
        local.class,
      )}
      type={local.type}
      {...rest}
    >
      {local.children}
    </button>
  );
}
