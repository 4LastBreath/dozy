import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '@/api';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { useToast } from '@/prodivers/toasts/toastContext';

const UpdatePasswordForm = () => {

  const toast = useToast()

  const fields = [
    {
      label: 'Password', 
      name: 'passwordCurrent', 
      placeholder: '••••••••',
      type: 'password'
    },
    {
      label: 'New Password', 
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
    passwordCurrent: z.string().min(8).max(40),
    password: z.string().min(8, {
      message: 'New password must be at least 8 characters'
    }).max(40, {
      message: 'New password must be lass than 40 characters'
    }),
    passwordConfirm: z.string()
    }).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"], // path of error
    })

    type FormFields = z.infer<typeof formSchema>

    const form = useForm<FormFields>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        passwordCurrent: '',
        password: '',
        passwordConfirm: ''
      }
    })

    const { formState: { isSubmitting, isValid } } = form;

    async function onSubmit (values: FormFields) {
      try {
        const res = await api.patch('/users/updateMyPassword', {
          passwordCurrent: values.passwordCurrent,
          password: values.password,
          passwordConfirm: values.passwordConfirm
        })

        if (res.data.status === 'success') {
          toast.success('Password updated with success!')
          form.reset()
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
  <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6 w-full'>
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
                      autoComplete={el.name === 'passwordCurrent' ? 'current-password' : 'new-password'}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
              </FormItem>
            )}/>
          ))}
        
          <Button type='submit' className='w-full' isLoading={isSubmitting} disabled={isSubmitting || !isValid}>Change Password</Button>
  </form>
</Form>
  );
};

export default UpdatePasswordForm;