import React from 'react';
import Header from '@components/common/header/index';

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div style={{ paddingTop: 56 }}>{children}</div>
    </>
  );
}
