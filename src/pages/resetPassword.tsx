import Layout from "@/layouts/layout";
import {ContentCard, ContentCardParagraph} from "@/components/ui/contentCard";
import ResetPasswordForm from "@/features/auth/resetPasswordForm";

const ResetPassword = () => {

  document.title = 'Dozy - Reset Password'

  return (
<Layout>

  <div className='min-w-full min-h-full'>

    <ContentCard title='Reset your password' withLogo={false}>
      <ContentCardParagraph>
        Choose a new password for your account.
      </ContentCardParagraph>
      <ResetPasswordForm />
    </ContentCard>

  </div>
</Layout>
  );
};

export default ResetPassword;