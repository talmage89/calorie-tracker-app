import clsx from 'clsx';
import { JSX, createEffect, createSignal, splitProps } from 'solid-js';
import './Tabs.scss';

export type TabsProps = JSX.HTMLAttributes<HTMLDivElement> & {};

export const Tabs = (props: TabsProps) => {
  const [local, rest] = splitProps(props, ['children', 'class']);

  const [showNavLeft, setShowNavLeft] = createSignal(false);
  const [showNavRight, setShowNavRight] = createSignal(false);

  let tabsRef: HTMLDivElement | undefined = undefined;

  createEffect(() => {
    if (!tabsRef) {
      return;
    }

    setShowNavRight(tabsRef.scrollLeft < tabsRef.scrollWidth - tabsRef.clientWidth);
  });

  function scroll(px: number) {
    if (!tabsRef) {
      return;
    }

    tabsRef.scrollTo({
      behavior: 'smooth',
      left: tabsRef.scrollLeft + px,
    });
  }

  function onScroll(e: Event) {
    const target = e.target as HTMLDivElement;

    if (!target) {
      return;
    }

    setShowNavLeft(target.scrollLeft > 0);
    setShowNavRight(target.scrollLeft < target.scrollWidth - target.clientWidth);
  }

  return (
    <div class="Tabs__container">
      {showNavLeft() && (
        <button
          class="Tabs__navigate Tabs__navigate--left"
          onClick={() => {
            scroll(-300);
          }}
        >
          <span class="material-icons">chevron_left</span>
        </button>
      )}
      <div
        class={clsx('Tabs', local.class)}
        onScroll={(e) => {
          onScroll(e);
        }}
        ref={tabsRef}
        {...rest}
      >
        {local.children}
      </div>
      {showNavRight() && (
        <button
          class="Tabs__navigate Tabs__navigate--right"
          onClick={() => {
            scroll(300);
          }}
        >
          <span class="material-icons">chevron_right</span>
        </button>
      )}
    </div>
  );
};
