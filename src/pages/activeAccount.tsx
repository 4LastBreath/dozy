import { ContentCard, ContentCardParagraph } from '@/components/ui/contentCard';
import Layout from '@/layouts/layout';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/prodivers/toasts/toastContext";
import { useEffect, useState } from "react";
import { LoaderCircle, Frown, Smile } from 'lucide-react';


const ActiveAccount = () => {

  document.title = 'Dozy - Account Recovery'

  const toast = useToast()
  const { recoveryToken } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const title = isLoading ? 'Loading...' : (error ? 'Something went wrong' : 'Account Recovered')

  async function activeAccountApi () {
    try {
      setIsLoading(true)
      await axios.patch(`https://dozynodejs-fm9v49nn.b4a.run/api/v1/users/activeAccount/${recoveryToken}`)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        return setError(err.response.data.message);
    }
     return toast.error('Something went wrong, please try again later');
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    activeAccountApi()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
<Layout>

  <ContentCard title={title} withLogo={false}>
    <ContentCardParagraph>
      {isLoading ? 
        <LoaderCircle className='animate-spin text-primary mx-auto'/> 
        : 
        (error ? 
          <>
            <span>{error}</span>
            <Frown className='mx-auto mt-2'/>
          </>  
        : 
          <>
            <span>Your account has been recovered with success</span>
            <Smile className='mx-auto mt-2'/>
          </>
        )
      }
    </ContentCardParagraph>
  </ContentCard>

</Layout>
  );
};

export default ActiveAccount;