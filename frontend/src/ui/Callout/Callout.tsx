import clsx from 'clsx';
import { JSX, splitProps } from 'solid-js';
import './Callout.scss';

export type CalloutProps = JSX.HTMLAttributes<HTMLDivElement> & {
  color?: 'primary' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet';
  icon?: string;
  onDismiss?: () => void;
};

export const Callout = (props: CalloutProps) => {
  const [local, rest] = splitProps(props, ['children', 'class', 'color', 'icon', 'onDismiss']);

  return (
    <div
      class={clsx(
        'Callout',
        {
          [`Callout--${local.color}`]: local.color,
          'Callout--withIcon': local.icon,
        },
        local.class,
      )}
      {...rest}
    >
      {local.icon && <span class="Callout__icon material-icons">{local.icon}</span>}
      {local.onDismiss && (
        <span
          class="Callout__icon Callout__icon--close material-icons"
          onClick={() => {
            local.onDismiss?.();
          }}
        >
          close
        </span>
      )}
      <div class="Callout__content">{local.children}</div>
    </div>
  );
};
