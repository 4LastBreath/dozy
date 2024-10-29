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
import { MIN_PASSWORD_CH, MAX_PASSWORD_CH } from '@/utils/maxLength';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPasswordForm = () => {

  const toast = useToast()
  const { resetToken } = useParams()
  const navigate = useNavigate()

  const fields = [
    {
      label: 'New Password', 
      name: 'password', 
      placeholder: 'mymail@example.com',
      type: 'password'
    },
    {
      label: 'Confirm New Password', 
      name: 'passwordConfirm',
      placeholder: '••••••••', 
      type: 'password'
    },
  ]

  const formSchema = z.object({
    password: z.string().min(MIN_PASSWORD_CH, {
      message: `Password must be at least ${MIN_PASSWORD_CH} characters`
    }).max(MAX_PASSWORD_CH, {
      message: `Password must be less than ${MAX_PASSWORD_CH} characters`
    }),
    passwordConfirm: z.string()
    }).refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ["passwordConfirm"], // path of error
  });
 

  type FormFields = z.infer<typeof formSchema>

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      passwordConfirm: ''
    },
  })

  const { formState: { isSubmitting }, setError } = form;

  async function onSubmit (values: FormFields) {
    try {
      const res = await axios.patch(`https://dozynodejs-kzyekxdo.b4a.run/api/v1/users/resetPassword/${resetToken}`, {
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      })

      if (res.data.status === 'success') {
        toast.success('Password updated with success!')
        form.reset()
        setTimeout(() => {
          navigate('/dozy/login')
        }, 500)
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        return setError('passwordConfirm', {message: err.response.data.message});
    }
     return toast.error('Something went wrong, please try again later');
    }
  }

  return (
<Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-6'>

      {fields.map((el) => (
          <FormField
            key={el.name}
            control={form.control}
            name={el.name as keyof FormFields}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{el.label}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder={el.placeholder} 
                    type={el.type} 
                    autoComplete={el.name === 'password' ? 'current-password' : 'on'}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
            </FormItem>
          )}/>
        ))}

        
          <Button type='submit' className='w-full' isLoading={isSubmitting} disabled={isSubmitting}>Submit</Button>
      </div>
    </form>
</Form>
  );
};

export default ResetPasswordForm;