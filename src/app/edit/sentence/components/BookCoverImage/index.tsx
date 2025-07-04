'use client';

import Image from 'next/image';
import { useState } from 'react';
import BookDefaultCover from '../BookDefaultCover';
import classes from './BookCoverImage.module.scss';

type BookCoverImageProps = {
  coverUrl: string;
  alt: string;
  width?: number;
  height?: number;
};

export default function BookCoverImage({
  coverUrl,
  alt,
  width = 83,
  height = 120,
}: BookCoverImageProps) {
  const [isErrorImage, setIsErrorImage] = useState(false);
  const showDefaultCover = isErrorImage || !coverUrl;
  return showDefaultCover ? (
    <BookDefaultCover />
  ) : (
    <Image
      className={classes.image}
      src={coverUrl}
      alt={alt}
      onError={() => setIsErrorImage(true)}
      loading="lazy"
      width={width}
      height={height}
    />
  );
}
