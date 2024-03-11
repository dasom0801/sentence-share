import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import router from './routes/index.route';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider router={router} />);
