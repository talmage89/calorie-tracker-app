import clsx from 'clsx';
import './ProgressRing.scss';

type ProgressRingProps = {
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
};

export const ProgressRing = ({ progress, strokeWidth = 3, size, label }: ProgressRingProps) => {
  if (progress < 0) {
    throw new Error('"Progress" prop on ProgressRing component must be between a positive number');
  }

  const calculateRadius = () => {
    return 100 / (2 * Math.PI);
  };

  const getViewBox = () => {
    const diameter = calculateRadius() * 2 + strokeWidth;
    return `0 0 ${diameter} ${diameter}`;
  };

  return (
    <div class="ProgressRing">
      <svg class="ProgressRing__svg" viewBox={getViewBox()} style={size ? { width: `${size}px` } : {}}>
        <g class="ProgressRing__svg__ring">
          <circle class="background" cx="50%" cy="50%" stroke-width={strokeWidth} r="15.915" />
          <circle
            class={clsx('completed', { 'completed--over': progress > 100 })}
            cx="50%"
            cy="50%"
            stroke-width={strokeWidth}
            r={calculateRadius()}
            stroke-dasharray={`${progress > 100 ? 100 : progress}, 100`}
          />
        </g>
      </svg>
      {label && <p class="ProgressRing__label">{label}</p>}
    </div>
  );
};
