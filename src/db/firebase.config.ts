import admin, { type ServiceAccount } from 'firebase-admin';
import serviceAccount from './service-account-key.json' assert { type: 'json' };

declare global {
  var firebaseAdmin: admin.app.App | undefined;
}

// Firebase Admin SDK가 이미 초기화되어 있는지 확인
if (!global.firebaseAdmin) {
  global.firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: 'https://sentence-share.firebaseio.com',
  });
}

export default global.firebaseAdmin;
