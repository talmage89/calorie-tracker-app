import { JSX, mergeProps, splitProps } from 'solid-js';
import clsx from 'clsx';
import './Button.scss';

export type ButtonVariant = 'default' | 'raised' | 'outlined';

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fluid?: boolean;
  rounded?: boolean;
  emphasized?: boolean;
  static?: boolean;
};

export function Button(props: ButtonProps) {
  props = mergeProps({ type: 'button', variant: 'default' } as ButtonProps, props);

  const [local, rest] = splitProps(props, [
    'class',
    'children',
    'fluid',
    'rounded',
    'emphasized',
    'static',
    'type',
    'variant',
  ]);

  return (
    <button
      class={clsx(
        {
          'Button--fluid': local.fluid,
          'Button--emphasized': local.emphasized,
          'Button--rounded': local.rounded,
          'Button--static': local.static,
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
