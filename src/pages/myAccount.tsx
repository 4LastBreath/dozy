import UpdatePasswordForm from '@/features/auth/updatePasswordForm';
import UpdateUserForm from '@/features/user/updateUserForm';
import Layout from '@/layouts/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Title from '@/components/ui/title';
import DeleteAccountDialog from '@/features/user/deleteAccountDialog';

const MyAccount = () => {

  document.title = 'Dozy - My Account'

  return (
  <Layout>

      <Tabs defaultValue="account" className="w-full flex gap-6 relative max-lg:flex-col lg:pl-[16rem]">
          <TabsList className='justify-start flex-row w-full h-auto px-1 py-1 bg-neutral-200/70 dark:bg-neutral-900/25 rounded-lg lg:flex-col lg:w-[16rem] lg:py-6 lg:px-2 lg:absolute lg:left-0 lg:top-0'>
            <TabsTrigger className='w-full py-4' value="account">Account</TabsTrigger>
            <TabsTrigger className='w-full py-4' value="password">Password</TabsTrigger>
          </TabsList>

          <div className='flex-1 w-full flex flex-col items-center'>

            {/* Account */}
            <TabsContent value="account" className='flex flex-col items-center w-full h-full max-w-lg'>
              <Title className='justify-center mb-6'>My Account</Title>
              <div className='bg-primary/30 w-[80%] h-[2px] mx-auto mb-8'/>
              <UpdateUserForm />
              <Title className='justify-center mb-6 mt-16'>Account Removal</Title>
              <div className='bg-primary/30 w-[80%] h-[2px] mx-auto mb-8'/>
              <DeleteAccountDialog />
            </TabsContent>

            {/* Password */}
            <TabsContent value="password" className='flex flex-col items-center w-full h-full max-w-lg'>
                <Title className='justify-center mb-6'>Change Password</Title>
                <div className='bg-primary/30 w-[80%] h-[2px] mx-auto mb-8'/>
                <UpdatePasswordForm />
            </TabsContent>
            
          </div>
      </Tabs>

  </Layout>
  );
};

export default MyAccount;