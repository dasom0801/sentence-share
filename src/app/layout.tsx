import type { Metadata } from 'next';
import { validateUserOnServer } from '@/utils/server-utils';
import '../styles/global.scss';
import { ClientProviders, Header } from './(main)/components';
import UserProvider from './(main)/components/UserProvider';

export const metadata: Metadata = {
  title: 'Sentence Share',
  description: '책 속의 문장 공유',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isTokenExpired } = await validateUserOnServer();

  return (
    <html lang="ko-KR">
      <body>
        <div id="root">
          <UserProvider user={user} isTokenExpired={isTokenExpired} />
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
