import clsx from 'clsx';
import { JSX, splitProps } from 'solid-js';
import './Checkbox.scss';

export type CheckboxProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Checkbox = (props: CheckboxProps) => {
  const [local, rest] = splitProps(props, ['class', 'label']);

  return (
    <>
      <label class="Checkbox__container">
        {local.label}
        <input class={clsx('Checkbox', local.class)} type="checkbox" {...rest} />
        <span class="Checkbox__mark"></span>
      </label>
    </>
  );
};
