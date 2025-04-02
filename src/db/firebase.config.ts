import admin, { type ServiceAccount } from 'firebase-admin';

declare global {
  var firebaseAdmin: admin.app.App | undefined;
}

// Firebase Admin SDK가 이미 초기화되어 있는지 확인
if (!global.firebaseAdmin) {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!raw) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT env variable이 없습니다.');
  }

  let serviceAccount: any;
  try {
    serviceAccount = JSON.parse(raw);
    if (typeof serviceAccount.private_key === 'string') {
      serviceAccount.private_key = serviceAccount.private_key.replace(
        /\\n/g,
        '\n',
      );
    }
  } catch {
    throw new Error('FIREBASE_SERVICE_ACCOUNT는 유효한 JSON 형식이 아닙니다.');
  }

  global.firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: 'https://sentence-share.firebaseio.com',
  });
}

export default global.firebaseAdmin;
