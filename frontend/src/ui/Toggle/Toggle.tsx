import clsx from 'clsx';
import { JSX, mergeProps, splitProps } from 'solid-js';
import './Toggle.scss';

export type ToggleLabelPosition = 'left' | 'right';

export type ToggleProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  labelPosition?: ToggleLabelPosition;
};

export const Toggle = (props: ToggleProps) => {
  props = mergeProps(
    {
      labelPosition: 'left',
    } as ToggleProps,
    props,
  );

  const [local, rest] = splitProps(props, ['class', 'label', 'labelPosition']);

  return (
    <>
      <label class="Toggle__container">
        {local.label && local.labelPosition === 'left' && local.label}
        <input class={clsx('Toggle', local.class)} type="checkbox" {...rest} />
        <div class="Toggle__control"></div>
        {local.label && local.labelPosition === 'right' && local.label}
      </label>
    </>
  );
};
