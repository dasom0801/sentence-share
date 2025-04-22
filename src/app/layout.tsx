import ClientProviders from '@/components/common/ClientProviders';
import Header from '@/components/common/Header';
import type { Metadata } from 'next';
import '../styles/global.scss';

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
        <div id="root">
          <ClientProviders>
            <div style={{ paddingTop: 56 }}>
              <Header />
              {children}
            </div>
          </ClientProviders>
        </div>
      </body>
    </html>
  );
}
