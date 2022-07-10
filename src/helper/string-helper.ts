import metrics from '../styles/metrics.module.scss';

export const converToMin = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds;
};

export enum Breakpoint {
  mobile = 0,
  tablet = parseInt(metrics.tablet, 10),
  smallLaptop = parseInt(metrics.smallLaptop, 10),
  laptop = parseInt(metrics.laptop, 10),
}