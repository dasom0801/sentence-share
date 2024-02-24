import { BiBookHeart } from 'react-icons/bi';

const Logo = () => {
  return (
    <div className='flex items-center gap-1 text-primary-800'>
      <BiBookHeart className='text-2xl md:text-3xl' />
      <span className='text-lg md:text-xl font-semibold'>SentenceShare</span>
    </div>
  );
};
export default Logo;
