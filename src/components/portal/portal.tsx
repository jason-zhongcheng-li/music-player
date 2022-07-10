import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  className?: string;
  el?: string;
}

// Create child element before DOM mounted
const Portal = ({ children, className, el = 'div' }: PropsWithChildren<PortalProps>) => {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.createElement(el);

    if (className) {
      ref.current.classList.add(className);
    }

    document.body.appendChild(ref.current);

    setMounted(true);

    return () => {
      document.body.removeChild(ref.current);
    };
  }, []);

  return mounted ? createPortal(children, ref.current) : null;
};

export default Portal;
