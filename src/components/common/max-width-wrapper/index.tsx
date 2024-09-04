import React from 'react';
import classes from './index.module.scss';

type MaxWidthWrapperProps = {
  styles?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

export default function MaxWidthWrapper({
  styles,
  children,
  className,
}: MaxWidthWrapperProps) {
  return (
    <div style={styles} className={`${classes.wrapper} ${className || ''}`}>
      {children}
    </div>
  );
}
