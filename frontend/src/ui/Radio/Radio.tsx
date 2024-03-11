import clsx from 'clsx';
import { JSX, splitProps } from 'solid-js';
import './Radio.scss';

export type RadioProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Radio = (props: RadioProps) => {
  const [local, rest] = splitProps(props, ['class', 'label']);

  return (
    <>
      <label class="Radio__container">
        {local.label}
        <input class={clsx('Radio', local.class)} type="radio" {...rest} />
        <span class="Radio__mark"></span>
      </label>
    </>
  );
};
