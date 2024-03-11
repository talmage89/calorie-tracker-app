import clsx from 'clsx';
import { JSX, splitProps } from 'solid-js';
import './Drawer.scss';

export type DrawerProps = JSX.HTMLAttributes<HTMLDivElement> & {
  backdrop?: boolean;
  isOpen: boolean;
  onClose?: () => void;
};

export const Drawer = (props: DrawerProps) => {
  const [local, rest] = splitProps(props, ['backdrop', 'class', 'isOpen', 'onClose']);

  return (
    <>
      {local.isOpen && (
        <>
          <div class={clsx('Drawer', local.class)} {...rest} />
          <div
            class={clsx('Drawer__overlay', {
              'Drawer__overlay--bg': local.backdrop,
            })}
            onClick={() => {
              local.onClose?.();
            }}
          />
        </>
      )}
    </>
  );
};
