import clsx from 'clsx';
import { JSX, splitProps } from 'solid-js';
import '../Input/Input.scss';

export type TextareaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  filled?: boolean;
  fluid?: boolean;
  iconLeading?: string;
  iconTrailing?: string;
};

export const Textarea = (props: TextareaProps) => {
  const [local, rest] = splitProps(props, ['class', 'filled', 'fluid', 'iconLeading', 'iconTrailing']);

  return (
    <div
      class={clsx('Input__container', {
        'Input__container--fluid': local.fluid,
      })}
    >
      {local.iconLeading && <span class="iconLeading material-icons">{local.iconLeading}</span>}
      {local.iconTrailing && <span class="iconTrailing material-icons">{local.iconTrailing}</span>}
      <textarea
        class={clsx(
          'Input--textarea',
          {
            'Input': !local.filled,
            'Input--filled': local.filled,
            'Input--fluid': local.fluid,
            'Input--iconLeading': local.iconLeading,
            'Input--iconTrailing': local.iconTrailing,
          },
          local.class,
        )}
        {...rest}
      />
    </div>
  );
};
