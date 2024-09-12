import { Button } from '@/components/ui/button';
import Layout from '@/layouts/layout';
import { useToast } from '@/prodivers/toasts/toastContext';
import { useAuth } from '@/prodivers/auth/authContext';

const Home = () => {

  const toast = useToast()
  const { user } = useAuth()


  return (
<Layout>
      <Button onClick={() => toast.info('This is a toast!')}>Info</Button>
      <Button onClick={() => toast.warning('This is a toast!')}>Warning</Button>
      <Button onClick={() => toast.success('This is a toast!')}>success</Button>
      <Button onClick={() => toast.error('This is a toast!')}>Error</Button>

      {user._id && 
        <>
            <div className='p-2 bg-neutral-900/10 border'>{user?.username}</div> 
            <div className='p-2 bg-neutral-900/10 border'>{user?._id}</div> 
            <div className='p-2 bg-neutral-900/10 border'>{user?.avatar}</div> 
            <div className='p-2 bg-neutral-900/10 border'>{user?.role}</div> 
        </>
      }


</Layout>
  );
};

export default Home;