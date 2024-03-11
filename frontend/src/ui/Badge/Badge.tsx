import clsx from 'clsx';
import { JSX, splitProps } from 'solid-js';
import './Badge.scss';

export type BadgeColor = 'default' | 'primary' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet';

export type BadgeProps = JSX.HTMLAttributes<HTMLDivElement> & {
  color?: BadgeColor;
};

export const Badge = (props: BadgeProps) => {
  const [local, rest] = splitProps(props, ['class', 'color']);

  return <div class={clsx('Badge', { [`Badge--${local.color}`]: local.color }, local.class)} {...rest} />;
};
