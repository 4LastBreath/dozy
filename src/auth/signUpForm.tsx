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
import { MAX_USERNAME_CH } from '@/utils/maxLength';
import { useAuth } from '@/prodivers/auth/authContext';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {

  const toast = useToast()
  const { fetchUserData } = useAuth()
  const navigate = useNavigate()

  const fields = [
    {
      label: 'Username', 
      name: 'username',
      placeholder: 'CoolUsername46',
      type: 'text'
    },
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
    {
      label: 'Confirm Password', 
      name: 'passwordConfirm',
      placeholder: '••••••••', 
      type: 'password'
    },
  ]

  const formSchema = z.object({
    username: z.string().trim().min(3, {
      message: 'Username must be at least 3 characters'
    }).max(MAX_USERNAME_CH),
    email: z.string().trim().email({message: 'Invalid email adress'}),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters'
    }).max(40, {
      message: 'Password must be less than 40 characters'
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
      username: '',
      email: '',
      password: '',
      passwordConfirm: ''
    },
  })

  const { formState: { isSubmitting } } = form;

  async function onSubmit (values: FormFields) {
    try {
      const res = await axios.post('http://localhost:3000/api/v1/users/signup', {
        username: values.username,
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm
      }, {
        withCredentials: true
      })

      if (res.data.status === 'success') {
        toast.success('Account created with success!')
        form.reset()
        setTimeout(() => {
          fetchUserData()
          navigate('/')
        }, 500)
      }

    } catch (err) {
      console.error(err)
      toast.error('Failed to create the account. Please try again later.')
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
                  <Input placeholder={el.placeholder} {...field} type={el.type}/>
                </FormControl>
                <FormMessage />
            </FormItem>
          )}/>
        ))}
      
        <Button type='submit' className='w-full' isLoading={isSubmitting} disabled={isSubmitting}>Sign up</Button>
      </div>
  </form>
 </Form>
  );
};

export default SignUpForm;