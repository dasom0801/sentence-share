import { MaxWidthWrapper } from '../components';
import { SettingContainer } from '../containers';

const SettingPage = () => {
  return (
    <main>
      <MaxWidthWrapper className='flex flex-col gap-8 p-8'>
        <SettingContainer />
      </MaxWidthWrapper>
    </main>
  );
};
export default SettingPage;
