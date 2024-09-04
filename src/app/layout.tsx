import type { Metadata } from 'next';
import '../styles/global.scss';
import ClientProviders from '@components/common/client-providers';

export const metadata: Metadata = {
  title: 'Sentence Share',
  description: '책 속의 문장 공유',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko-KR">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
