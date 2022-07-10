import { FC } from 'react';
import classnames from 'classnames';

import styles from './image.module.scss';

interface Asset {
  alt?: string;
  url: string;
  isCover?: boolean;
}

type ImageType = Pick<Asset, 'url' | 'alt'>;

interface ImageProps {
  image?: ImageType;
  className?: string;
}

export const Image: FC<ImageProps> = (props) => {
  const { image, className } = props;

  return (
    <div className={classnames(styles.imageContainer, className)}>
      <img src={image.url} alt={image.alt} loading="lazy" />
    </div>
  );
};
