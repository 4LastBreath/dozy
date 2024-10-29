import Layout from "@/layouts/layout";
import {ContentCard, ContentCardParagraph} from "@/components/ui/contentCard";
import RecoverAccountForm from "@/features/auth/recoverAccountForm";


const RecoverAccount = () => {

  document.title = 'Dozy - Account Recovery'

  return (
<Layout>

  <div className='min-w-full min-h-full'>

    <ContentCard title='Recover your account' withLogo={false}>
      <ContentCardParagraph>
        Please enter the email dress associated with your account. 
        We'll seed you a link to recover your account.
      </ContentCardParagraph>
      <RecoverAccountForm />
    </ContentCard>

  </div>

</Layout>
  );
};

export default RecoverAccount;