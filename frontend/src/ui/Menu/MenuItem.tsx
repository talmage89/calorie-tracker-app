import clsx from 'clsx';
import { JSX, splitProps } from 'solid-js';
import { Button, ButtonProps } from '../Button/Button';

export type MenuItemProps = ButtonProps & {};

export const MenuItem = (props: MenuItemProps) => {
  const [local, rest] = splitProps(props, ['class', 'style']);

  return (
    <>
      <Button
        class={clsx(local.class)}
        style={{
          'border-radius': 0,
          'text-align': 'left',
          ...(local.style as JSX.CSSProperties),
        }}
        {...rest}
      />
    </>
  );
};
