import clsx from 'clsx';
import { JSX, splitProps } from 'solid-js';
import './Menu.scss';

export type MenuProps = JSX.HTMLAttributes<HTMLDivElement> & {};

export const Menu = (props: MenuProps) => {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <>
      <div class={clsx('Menu', local.class)} {...rest} />
    </>
  );
};
