import { addMonths, format, getDay, getDaysInMonth, getMonth, getYear, isSameDay, setDate, subMonths } from 'date-fns';
import { createEffect, createSignal } from 'solid-js';
import { IconButton } from '../IconButton/IconButton';
import { Input } from '../Input/Input';
import { Popover } from '../Popover/Popover';
import './DatePicker.scss';

type DatePickerProps = {
  fluid?: boolean;
  onChange?: (e: Date | undefined) => void;
  value?: Date;
};

export const DatePicker = (props: DatePickerProps) => {
  const now = new Date();
  const initialDate = props.value ? props.value : now;
  const [calendarDate, setCalendarDate] = createSignal(initialDate);
  const [calendarOpen, setCalendarOpen] = createSignal(false);
  const daysInMonth = getDaysInMonth(calendarDate());
  const firstDayWeekday = getDay(setDate(calendarDate(), 1));

  createEffect(() => {
    if (!props.value) {
      return;
    }
    setCalendarDate(props.value);
  });

  function back(months = 1) {
    const backDate = subMonths(calendarDate(), months);
    setCalendarDate(backDate);
  }

  function forward(months = 1) {
    const forwardDate = addMonths(calendarDate(), months);
    setCalendarDate(forwardDate);
  }

  function clickDay(day: number) {
    const newSelected = new Date(getYear(calendarDate()), getMonth(calendarDate()), day);

    if (!props.onChange) {
      return;
    }

    if (props.value && isSameDay(newSelected, props.value)) {
      props.onChange(undefined);
    } else {
      props.onChange(newSelected);
    }
  }

  function dayIsSelected(day: number) {
    if (!day || !props.value) {
      return false;
    }
    const date = new Date(getYear(calendarDate()), getMonth(calendarDate()), day);
    return isSameDay(date, props.value);
  }

  function daysInMonthArray() {
    let array = [];
    for (let i = 0; i < daysInMonth; i++) {
      array.push(i + 1);
    }
    return array;
  }

  function sliceIntoChunks(arr: any[], chunkSize: number) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  function weekChunk() {
    let dimArray = daysInMonthArray();
    let firstWeek = []; // e.g: [null, null, null, null, null, 1, 2]
    let lastDayInFirstWeek = 0;
    let rest = [];
    for (let i = 0; i < firstDayWeekday; i++) {
      firstWeek.push(null);
    }
    for (let i = firstDayWeekday; i < 7; i++) {
      firstWeek.push(dimArray[i - firstDayWeekday]);
      lastDayInFirstWeek = i - firstDayWeekday;
    }
    for (let i = lastDayInFirstWeek + 1; i < dimArray.length; i++) {
      rest.push(dimArray[i]);
    }
    return sliceIntoChunks(firstWeek.concat(rest), 7);
  }

  return (
    <>
      <div class="DatePicker__container">
        <Input
          iconLeading="calendar_month"
          onClick={() => {
            setCalendarOpen(!calendarOpen());
          }}
          readOnly
          style={{
            cursor: 'pointer',
          }}
          value={props.value ? format(props.value, 'MMMM d, yyyy') : ''}
        />
        <Popover
          isOpen={calendarOpen()}
          onClose={() => {
            setCalendarOpen(false);
          }}
          style={{
            padding: '1rem',
            width: '320px',
          }}
        >
          <div class="DatePicker">
            <div class="DatePicker__navigation">
              <IconButton
                onClick={() => {
                  back(12);
                }}
              >
                <span class="material-icons">keyboard_double_arrow_left</span>
              </IconButton>
              <IconButton
                onClick={() => {
                  back();
                }}
              >
                <span class="material-icons">keyboard_arrow_left</span>
              </IconButton>
              <h4 class="DatePicker__month">{format(calendarDate(), 'MMM yyyy')}</h4>
              <IconButton
                onClick={() => {
                  forward();
                }}
              >
                <span class="material-icons">keyboard_arrow_right</span>
              </IconButton>
              <IconButton
                onClick={() => {
                  forward(12);
                }}
              >
                <span class="material-icons">keyboard_double_arrow_right</span>
              </IconButton>
            </div>
            <div class="DatePicker__calendar">
              <table>
                <thead>
                  <tr>
                    <th>S</th>
                    <th>M</th>
                    <th>T</th>
                    <th>W</th>
                    <th>T</th>
                    <th>F</th>
                    <th>S</th>
                  </tr>
                </thead>
                <tbody>
                  {weekChunk().map((week) => {
                    return (
                      <tr>
                        {week.map((day) => {
                          return (
                            <td
                              class={dayIsSelected(day) ? 'DatePicker__selected' : undefined}
                              onClick={() => {
                                clickDay(day);
                              }}
                            >
                              {day}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Popover>
      </div>
    </>
  );
};
