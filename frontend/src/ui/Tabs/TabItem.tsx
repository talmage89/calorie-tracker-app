import clsx from 'clsx';
import { JSX, splitProps } from 'solid-js';
import './TabItem.scss';

export type TabItemProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export const TabItem = (props: TabItemProps) => {
  const [local, rest] = splitProps(props, ['active', 'children', 'class', 'onClick']);

  return (
    <>
      <button
        class={clsx(
          'TabItem',
          {
            'TabItem--active': local.active,
          },
          local.class,
        )}
        onClick={(e) => {
          const target = e.target as HTMLButtonElement;

          if (!target) {
            return;
          }

          target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }}
        {...rest}
      >
        {local.children}
      </button>
    </>
  );
};
