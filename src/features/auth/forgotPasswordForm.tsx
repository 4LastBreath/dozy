import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { useToast } from '@/prodivers/toasts/toastContext';

const ForgotPasswordForm = () => {

  const toast = useToast()

  const formSchema = z.object({
    email: z.string().trim().email({message: 'Invalid email adress'}),
  })

  type FormFields = z.infer<typeof formSchema>

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const { formState: { isSubmitting }, setError } = form;

  async function onSubmit (values: FormFields) {
    try {
      const res = await axios.post('https://dozynodejs-kzyekxdo.b4a.run/api/v1/users/forgotPassword', {
        email: values.email,
      })

      if (res.data.status === 'success') {
        toast.success('The reset password link has been sent!')
        form.reset()
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        return setError('email', {message: err.response.data.message});
    }
     return toast.error('Something went wrong, please try again later');
    }
  }


  return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-6'>

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder='mymail@example.com'
                    type='text'
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
            </FormItem>
          )}/>

        
          <Button type='submit' className='w-full' isLoading={isSubmitting} disabled={isSubmitting}>Submit</Button>
      </div>
    </form>
   </Form>
  );
};

export default ForgotPasswordForm;