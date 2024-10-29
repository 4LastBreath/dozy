import { useState } from 'react';
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
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/prodivers/auth/authContext';

const LoginForm = () => {

  const { fetchUserData } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const [isAccountDisabled, setIsAccountDisabled] = useState(false)

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

  const { formState: { isSubmitting }, setError } = form;

  async function onSubmit (values: FormFields) {
    setIsAccountDisabled(false)
    try {
      const res = await axios.post('https://dozynodejs-kzyekxdo.b4a.run/api/v1/users/login', {
        email: values.email,
        password: values.password,
      }, {
        withCredentials: true,
      })

      if (res.data.status === 'success') {
        toast.success('You\'re logged in!')
        form.reset()
        fetchUserData()
        setTimeout(() => {
          navigate('/dozy/')
        }, 500)
      }

    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
          if (err.response.data.message === 'This account has been disabled') {
            return setIsAccountDisabled(true)
          }
          return setError('root', {
            message: err.response.data.message
          });
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
                {(form.formState.errors.root && el.name === 'password') && <FormMessage>{form.formState.errors.root.message}</FormMessage>}
                {(isAccountDisabled && el.name === 'password') &&
                  <FormMessage>
                    <span>This account has been disabled, you can recover it </span>
                    <Link to={'/recoverAccount'} className='underline'>here.</Link>
                  </FormMessage>
                }
            </FormItem>
          )}/>
        ))}

        <Link to='/forgotPassword' className='w-fit text-[0.75rem] mt-[-10px] ml-auto mr-1 text-neutral-600 dark:text-neutral-300 hover:text-primary'>
          Forgot password?
        </Link>
      
        <Button type='submit' className='w-full' isLoading={isSubmitting} disabled={isSubmitting}>Log In</Button>
      </div>
  </form>
 </Form>
  );
};

export default LoginForm;