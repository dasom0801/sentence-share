import { getUser } from '@/api/user';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
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
  const cookieStore = cookies();
  const token = cookieStore.get('access_token');
  let user = null;
  if (token?.value) {
    try {
      const { data } = await getUser();
      user = data;
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
    }
  }

  return (
    <html lang="ko-KR">
      <body>
        <div id="root">
          <UserProvider user={user} />
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
