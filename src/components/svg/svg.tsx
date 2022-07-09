import { cloneElement, forwardRef, ReactChild } from 'react';
import classnames from 'classnames';
import styles from './svg.module.scss';

const music: ReactChild = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000000"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="5.5" cy="17.5" r="2.5" />
    <circle cx="17.5" cy="15.5" r="2.5" />
    <path d="M8 17V5l12-2v12" />
  </svg>
);

const search: ReactChild = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
      d="M31,28.26l8.28,8.29a1.55,1.55,0,0,1,.36,1.06,1.53,1.53,0,0,1-.46,1,1.54,1.54,0,0,1-2.08.07l-8.27-8.26A12.29,12.29,0,1,1,31,28.27Zm-9.71,1.68a9.2,9.2,0,1,0-6.51-2.69A9.24,9.24,0,0,0,21.29,29.94Z"
    />
  </svg>
);

const play: ReactChild = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000000"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const pause: ReactChild = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000000"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

const forward: ReactChild = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000000"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 4 15 12 5 20 5 4"></polygon>
    <line x1="19" y1="5" x2="19" y2="19"></line>
  </svg>
);

const rewind: ReactChild = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000000"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="19 20 9 12 19 4 19 20"></polygon>
    <line x1="5" y1="19" x2="5" y2="5"></line>
  </svg>
);

export const SVG = {
  music,
  forward,
  pause,
  play,
  rewind,
  search,
};

export type SVGT = keyof typeof SVG;

export interface SvgProps {
  className?: string;
  name: SVGT | string;
  ariaHidden?: boolean;
  title?: string;
  onClick?(): void;
  classes?: {
    container?: string;
    svg: string;
  };
}

export type SvgRef = HTMLSpanElement;

export const Svg = forwardRef<SvgRef, SvgProps>((props: SvgProps, ref) => {
  const { name, className, ariaHidden, onClick, title, classes } = props;

  return (
    <span
      className={classnames(styles.svg, className, classes?.container)}
      aria-hidden={!!ariaHidden}
      onClick={onClick}
      ref={ref}
      title={title}
    >
      {cloneElement(SVG[name], { className: classes?.svg })}
    </span>
  );
});
