'use client';

import Image from 'next/image';
import { useState } from 'react';
import BookDefaultCover from '../BookDefaultCover';
import classes from './BookCoverImage.module.scss';

type BookCoverImageProps = {
  coverUrl: string;
  alt: string;
};

export default function BookCoverImage({ coverUrl, alt }: BookCoverImageProps) {
  const [showDefaultCover, setShowDefaultCover] = useState(false);
  return (
    <>
      {showDefaultCover || !coverUrl ? (
        <BookDefaultCover />
      ) : (
        <Image
          className={classes.image}
          src={coverUrl}
          alt={alt}
          onError={() => setShowDefaultCover(true)}
          loading="lazy"
          width={83}
          height={120}
        />
      )}
    </>
  );
}
