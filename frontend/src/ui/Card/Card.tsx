import clsx from 'clsx';
import { JSX, mergeProps, splitProps } from 'solid-js';
import './Card.scss';

export type CardShadow = 'none' | 'sm' | 'md' | 'lg';

export type CardProps = JSX.HTMLAttributes<HTMLDivElement> & {
  fluid?: boolean;
  interactive?: boolean;
  rounded?: boolean;
  shadow?: CardShadow;
};

export const Card = (props: CardProps) => {
  props = mergeProps(
    {
      shadow: 'sm',
      rounded: true,
    } as CardProps,
    props,
  );

  const [local, rest] = splitProps(props, ['class', 'fluid', 'interactive', 'rounded', 'shadow']);

  return (
    <div
      class={clsx(
        'Card',
        {
          'Card--fluid': local.fluid,
          'Card--interactive': local.interactive,
          'Card--rounded': local.rounded,
          [`shadow-${local.shadow}`]: local.shadow,
        },
        local.class,
      )}
      {...rest}
    />
  );
};
