import Layout from '@/layouts/layout';
import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';

const NotFound = () => {
  return (
<Layout>
    <div className='h-full w-full flex items-center justify-center'>

        <div className='flex flex-col gap-3 items-center'>
          <div className='flex flex-col gap-1 items-center'>
            <h1 className='text-6xl text-primary'>404</h1>
            <h2 className='text-2xl'>Page not found</h2>
          </div>
          <p className='text-neutral-600 dark:text-neutral-400 text-center mb-7'>Oops! The page you're looking for doesn't exist.</p>
          <Link to='/' className={buttonVariants({ variant: 'secondary' })}>Return Home</Link>
        </div>

      
    </div>
</Layout>
  );
};

export default NotFound;