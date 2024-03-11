import clsx from 'clsx';
import { JSX, mergeProps, splitProps } from 'solid-js';
import './IconButton.scss';

export type IconButtonColor =
  | 'default'
  | 'primary'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'indigo'
  | 'violet';

export type IconButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: IconButtonColor;
};

export const IconButton = (props: IconButtonProps) => {
  props = mergeProps(
    {
      color: 'default',
      type: 'button',
    } as IconButtonProps,
    props,
  );

  const [local, rest] = splitProps(props, ['class', 'color', 'type']);

  return (
    <button
      class={clsx(
        'IconButton',
        {
          [`IconButton--color--${local.color}`]: local.color,
        },
        local.class,
      )}
      type={local.type}
      {...rest}
    ></button>
  );
};
