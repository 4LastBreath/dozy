import SignUpForm from '@/features/auth/signUpForm';
import { ContentCard } from '@/components/ui/contentCard';
import Layout from '@/layouts/layout';

const SignUp = () => {

  document.title = 'Dozy - Sign Up'

  return (
<Layout>

  <div className='min-w-full min-h-full'>

    <ContentCard title='Create your account!'>
      <SignUpForm />
    </ContentCard>

  </div>

</Layout>
  );
};

export default SignUp;