import Layout from '@/layouts/layout';
import LoginForm from '@/features/auth/loginForm';
import { ContentCard } from '@/components/ui/contentCard';

const Login = () => {
  return (
<Layout>
  <div className='min-w-full min-h-full'>

    <ContentCard title='Log into your account'>
      <LoginForm />
    </ContentCard>

  </div>
</Layout>
  );
};

export default Login;