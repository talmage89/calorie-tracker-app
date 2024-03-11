import clsx from 'clsx';
import { JSX, mergeProps, splitProps } from 'solid-js';
import './Button.scss';

export type ButtonColor = 'default' | 'primary' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonVariant = 'default' | 'raised' | 'outlined';

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: ButtonColor;
  fluid?: boolean;
  iconLeading?: string;
  iconTrailing?: string;
  rounded?: boolean;
  size?: ButtonSize;
  small?: boolean;
  variant?: ButtonVariant;
};

export function Button(props: ButtonProps) {
  props = mergeProps(
    {
      color: 'default',
      size: 'md',
      type: 'button',
      variant: 'default',
    } as ButtonProps,
    props,
  );

  const [local, rest] = splitProps(props, [
    'class',
    'children',
    'fluid',
    'iconLeading',
    'iconTrailing',
    'rounded',
    'color',
    'size',
    'type',
    'variant',
  ]);

  return (
    <button
      class={clsx(
        {
          'Button--fluid': local.fluid,
          'Button--iconLeading': local.iconLeading,
          'Button--iconTrailing': local.iconTrailing,
          'Button--rounded': local.rounded,
          [`Button--color--${local.color}`]: local.color,
          [`Button--size--${local.size}`]: local.size,
          [`Button--variant--${local.variant}`]: local.variant,
        },
        local.class,
      )}
      type={local.type}
      {...rest}
    >
      {local.iconLeading && <span class="iconLeading material-icons">{local.iconLeading}</span>}
      {local.children}
      {local.iconTrailing && <span class="iconTrailing material-icons">{local.iconTrailing}</span>}
    </button>
  );
}
