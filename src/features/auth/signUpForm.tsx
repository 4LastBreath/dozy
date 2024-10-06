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
import { MAX_USERNAME_CH, MIN_PASSWORD_CH, MAX_PASSWORD_CH } from '@/utils/maxLength';
import { useAuth } from '@/prodivers/auth/authContext';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

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
    recaptcha: z.string({ message: 'reCAPTCHA is required' }),
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
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      recaptcha: '',
    },
  })

  const { formState: { isSubmitting }, setError, setValue } = form;

  const onRecaptchaChange = (token: string | null) => {
    setValue('recaptcha', token || '');
  };

  async function onSubmit (values: FormFields) {
    console.log(values)
    try {
      const res = await axios.post('http://localhost:3000/api/v1/users/signup', {
        username: values.username,
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
        recaptcha: values.recaptcha
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
      if (axios.isAxiosError(err) && err.response?.data.error.code === 11000) {
        return setError('root', {
          message: 'This email is already taken'
        });
      }

      if (axios.isAxiosError(err) && err.response?.data?.message) {
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
                    autoComplete={el.type === 'password' ? 'new-password' : 'on'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
            </FormItem>
          )}/>
        ))}

        <div className='flex flex-col gap-1 w-fit mx-auto'>
            <ReCAPTCHA
              sitekey='6LeAbVIqAAAAAP1MIvmmlYdv8vFnCAvxOvg98AP8'
              onChange={onRecaptchaChange}
            />
          {form.formState.errors.recaptcha && <FormMessage>{form.formState.errors.recaptcha.message}</FormMessage>}
        </div>

        {form.formState.errors.root && <FormMessage>{form.formState.errors.root.message}</FormMessage>}
      
      
        <Button type='submit' className='w-full' isLoading={isSubmitting} disabled={isSubmitting}>Sign up</Button>
      </div>
  </form>
 </Form>
  );
};

export default SignUpForm;