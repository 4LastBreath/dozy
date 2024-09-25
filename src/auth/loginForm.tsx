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
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/prodivers/auth/authContext';

const LoginForm = () => {

  const { fetchUserData } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const fields = [
    {
      label: 'Email', 
      name: 'email', 
      placeholder: 'mymail@example.com',
      type: 'text'
    },
    {
      label: 'Password', 
      name: 'password',
      placeholder: '••••••••', 
      type: 'password'
    },
  ]

  const formSchema = z.object({
    email: z.string().trim().email({message: 'Invalid email adress'}),
    password: z.string(),
  })

  type FormFields = z.infer<typeof formSchema>

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { formState: { isSubmitting } } = form;

  async function onSubmit (values: FormFields) {
    try {
      const res = await axios.post('http://localhost:3000/api/v1/users/login', {
        email: values.email,
        password: values.password,
      }, {
        withCredentials: true,
      })

      if (res.data.status === 'success') {
        toast.success('You\'re logged in!')
        form.reset()
        setTimeout(() => {
          fetchUserData()
          navigate('/')
        }, 500)
      }

    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
          return toast.error(err.response.data.message);
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
      
        <Button type='submit' className='w-full' isLoading={isSubmitting} disabled={isSubmitting}>Log In</Button>
      </div>
  </form>
 </Form>
  );
};

export default LoginForm;