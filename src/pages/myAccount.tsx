import UpdatePasswordForm from '@/auth/updatePasswordForm';
import UpdateUserForm from '@/auth/updateUserForm';
import Layout from '@/layouts/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Title from '@/components/ui/title';

const MyAccount = () => {
  return (
  <Layout>

      
      <Tabs defaultValue="account" className="w-full h-full flex gap-6 relative max-md:flex-col">
          <TabsList className='justify-start flex-row w-full h-auto px-1 py-1 rounded-lg shrink-0 md:flex-col md:h-full md:w-[16rem] md:py-6 md:px-2'>
            <TabsTrigger className='w-full py-4' value="account">Account</TabsTrigger>
            <TabsTrigger className='w-full py-4' value="password">Password</TabsTrigger>
          </TabsList>

          <div className='flex-1 w-full flex flex-col items-center py-6'>
            {/* Account */}

            <TabsContent value="account" className='flex flex-col items-center w-full max-w-lg'>
              <Title className='justify-center mb-6'>Account</Title>
              <div className='bg-primary/30 w-[80%] h-[2px] mx-auto mb-8'></div>
              <UpdateUserForm />
            </TabsContent>

            {/* Password */}
            <TabsContent value="password" className='max-w-lg mx-auto'>
                <Title className='justify-center mb-6'>Change Password</Title>
                <div className='bg-primary/30 w-[80%] h-[2px] mx-auto mb-8'></div>
                <UpdatePasswordForm />
            </TabsContent>
          </div>
      </Tabs>


  </Layout>
  );
};

export default MyAccount;