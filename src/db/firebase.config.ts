import admin, { type ServiceAccount } from 'firebase-admin';
import serviceAccount from './service-account-key.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: 'https://sentence-share.firebaseio.com',
});

export default admin;
