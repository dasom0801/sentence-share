import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='font-NotoSans'>
        <Header />
        <Outlet />
        {/* <Routes> */}
        {/* <Route path='/' element={<ListContainer />} />
        <Route path='/info' element={<UserContainer />} />
        <Route path='/sentence' element={<UserContainer />} />
        <Route path='/likes' element={<UserContainer />} />
        <Route path='/user-detail/:id' element={<DetailContainer />} />
        <Route path='/book-detail/:id' element={<DetailContainer />} />
        <Route path='/search' element={<ListKeywordSearch />} />
        <Route path='/add' element={<BookContainer />} />
        <Route path='/modify/:id' element={<BookContainer />} /> */}
        {/* </Routes> */}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
