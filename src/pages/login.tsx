import Layout from '@/layouts/layout';
import Logo from '@/components/logo/logo';
import LoginForm from '@/auth/loginForm';
import Title from '@/components/ui/title';

const Login = () => {
  return (
<Layout>
  <div className='min-w-full min-h-full'>

    <div className='w-full max-w-md py-8 sm:px-6 sm:shadow-xl rounded-xl mx-auto sm:border sm:bg-surface bg-transparent px-2'>

      <div className='flex gap-4 justify-center w-full mb-6'>
        <Logo />
        <Title>Log into your account</Title>
      </div>

      <LoginForm />

    </div>

  </div>
</Layout>
  );
};

export default Login;