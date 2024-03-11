import clsx from 'clsx';
import { JSX, createEffect, mergeProps, splitProps } from 'solid-js';
import { IconButton } from '~/ui';
import './Dialog.scss';

export type DialogProps = JSX.HTMLAttributes<HTMLDialogElement> & {
  backdrop?: boolean;
  closeButton?: boolean;
  closeOnBackdropClick?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
};

export const Dialog = (props: DialogProps) => {
  props = mergeProps(
    {
      backdrop: true,
      closeButton: true,
      closeOnBackdropClick: true,
    } as DialogProps,
    props,
  );

  const [local, rest] = splitProps(props, [
    'backdrop',
    'children',
    'class',
    'closeButton',
    'closeOnBackdropClick',
    'isOpen',
    'onClose',
  ]);

  let dialogRef: HTMLDialogElement | undefined;

  createEffect(() => {
    if (local.isOpen) {
      if (dialogRef?.showModal) {
        dialogRef?.showModal();
      }
    } else {
      setTimeout(() => {
        dialogRef?.close();
      }, 0);
    }
  });

  function backdropClick(e: MouseEvent) {
    if (!dialogRef || !local.closeOnBackdropClick) {
      return;
    }

    const dialogRect = dialogRef?.getBoundingClientRect();
    const clickedInDialog =
      dialogRect.top <= e.clientY &&
      e.clientY <= dialogRect.top + dialogRect.height &&
      dialogRect.left <= e.clientX &&
      e.clientX <= dialogRect.left + dialogRect.width;

    if (!clickedInDialog) {
      setTimeout(() => {
        local.onClose?.();
      }, 0);
    }
  }

  return (
    <>
      {local.isOpen && (
        <dialog
          class={clsx(
            'Dialog',
            {
              'Dialog--backdrop': local.backdrop,
            },
            local.class,
          )}
          onClick={backdropClick}
          ref={dialogRef}
          {...rest}
        >
          {local.closeButton && (
            <IconButton
              class="Dialog__close"
              onClick={() => {
                setTimeout(() => {
                  local.onClose?.();
                }, 0);
              }}
            >
              <span class="material-icons">close</span>
            </IconButton>
          )}
          {local.children}
        </dialog>
      )}
    </>
  );
};
