import Layout from "@/layouts/layout";
import {ContentCard, ContentCardParagraph} from "@/components/ui/contentCard";
import ForgotPasswordForm from "@/features/auth/forgotPasswordForm";

const ForgotPassword = () => {
  return (
<Layout>
  <div className='min-w-full min-h-full'>

    <ContentCard title='Forgot your password?' withLogo={false}>
      <ContentCardParagraph>
        Please enter the email address associated with your account. 
        We'll seed you a link to reset your password.
      </ContentCardParagraph>
      <ForgotPasswordForm />
    </ContentCard>

  </div>
</Layout>
  );
};

export default ForgotPassword;