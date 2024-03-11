import clsx from 'clsx';
import { JSX, onCleanup, onMount, splitProps } from 'solid-js';
import './Popover.scss';

export type PopoverProps = JSX.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  onClose?: () => void;
};

export const Popover = (props: PopoverProps) => {
  const [local, rest] = splitProps(props, ['class', 'isOpen', 'onClose']);

  onMount(() => {
    document.addEventListener('keydown', handleKeyDown);
  });

  onCleanup(() => {
    document.removeEventListener('keydown', handleKeyDown);
  });

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      local.onClose?.();
    }
  }

  return (
    <>
      {local.isOpen && (
        <>
          <div class={clsx('Popover', local.class)} {...rest} />
          <div
            class="Popover__overlay"
            onClick={() => {
              local.onClose?.();
            }}
          />
        </>
      )}
    </>
  );
};

export default Popover;
