import { AllHTMLAttributes, PropsWithChildren, useRef, useEffect } from 'react';
import classnames from 'classnames';

import styles from './drawer.module.scss';
import Portal from '../portal/portal';

type DrawerOpenDirection = 'top' | 'bottom';

export type DrawerClasses = {
  drawer?: string;
};

interface DrawerProps extends AllHTMLAttributes<HTMLDivElement> {
  openFrom: DrawerOpenDirection;
  isOpen: boolean;
  fullwidthMobile: boolean;
  classes?: DrawerClasses;
}

const Drawer = (props: PropsWithChildren<DrawerProps>) => {
  const { isOpen, children, openFrom, fullwidthMobile, classes, ...rest } = props;

  return (
    <Portal>
      <div
        {...rest}
        className={classnames(
          styles.drawer,
          classes?.drawer,
          isOpen && styles.open,
          openFrom === 'bottom' && styles.bottom,
          fullwidthMobile && styles.fullwidthMobile
        )}
      >
        {children}
      </div>
    </Portal>
  );
};

export default Drawer;
