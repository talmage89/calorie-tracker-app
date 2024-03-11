import clsx from 'clsx';
import { JSX, createSignal, splitProps } from 'solid-js';
import { Checkbox } from '../Checkbox/Checkbox';
import { Input, InputProps } from '../Input/Input';
import '../Input/Input.scss';
import { Popover, PopoverProps } from '../Popover/Popover';
import './MultiSelect.scss';

export type MultiSelectOption = {
  label: string;
  value: string;
};

export type MultiSelectProps = JSX.HTMLAttributes<HTMLDivElement> & {
  inputProps?: Omit<InputProps, 'onChange' | 'onClick' | 'readOnly' | 'value'>;
  onChange?: (value: string[]) => void;
  options?: MultiSelectOption[];
  popoverProps?: Omit<PopoverProps, 'isOpen' | 'onClose'>;
  value?: string[];
};

export const MultiSelect = (props: MultiSelectProps) => {
  const [local, rest] = splitProps(props, ['class', 'inputProps', 'onChange', 'options', 'popoverProps', 'value']);

  const [isOpen, setIsOpen] = createSignal(false);

  function valueToString() {
    if (!local.value || local.value.length < 1) {
      return '';
    }
    return `${local.value.length} selected`;
  }

  return (
    <>
      <div class={clsx('MultiSelect', local.class)} {...rest}>
        <Input
          onClick={() => {
            setIsOpen(true);
          }}
          readOnly
          value={valueToString()}
          {...local.inputProps}
        />
        <Popover
          isOpen={isOpen()}
          onClose={() => {
            setIsOpen(false);
          }}
          {...local.popoverProps}
        >
          <div class="MultiSelect__popover">
            <div class="MultiSelect__popover__options">
              {local.options?.map((option) => {
                return (
                  <Checkbox
                    checked={local.value?.includes(option.value)}
                    label={option.label}
                    onChange={() => {
                      if (local.value?.includes(option.value)) {
                        local.onChange?.(local.value.filter((v) => v !== option.value));
                      } else {
                        local.onChange?.([...(local.value || []), option.value]);
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
        </Popover>
      </div>
    </>
  );
};
