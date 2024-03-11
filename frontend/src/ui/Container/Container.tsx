import clsx from 'clsx';
import { JSX, splitProps } from 'solid-js';
import './Container.scss';

export type ContainerProps = JSX.HTMLAttributes<HTMLDivElement> & {};

export const Container = (props: ContainerProps) => {
  const [local, rest] = splitProps(props, ['class']);

  return <div class={clsx('Container', local.class)} {...rest} />;
};
