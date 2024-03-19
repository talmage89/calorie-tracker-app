import clsx from 'clsx';
import { JSX, splitProps } from 'solid-js';
import { IoClose } from 'solid-icons/io';
import './Modal.scss';

type ModalProps = JSX.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  onClose: () => void;
  header: string;
};

export const Modal = (props: ModalProps) => {
  const [local, rest] = splitProps(props, ['class', 'isOpen', 'onClose', 'header']);

  return (
    <div class={clsx('Modal', local.class, props.isOpen && 'Modal--open')} {...rest}>
      <div class="Modal__content shadow-md">
        <div class="Modal__content__header">
          <IoClose class="Modal__content__header__close" onClick={props.onClose} />
          <p>{props.header}</p>
        </div>
        <div class="Modal__content__body">{props.children}</div>
      </div>
    </div>
  );
};
