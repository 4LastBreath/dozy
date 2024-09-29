import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useToast } from '@/prodivers/toasts/toastContext';
import { useAuth } from '@/prodivers/auth/authContext';
import { MAX_USERNAME_CH } from '@/utils/maxLength';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import EditAvatarDialog from './editAvatarDialog';
import { Label } from '@/components/ui/label';
import { Camera } from 'lucide-react';

import api from '@/api';

const UpdateUserForm = () => {

  const { fetchUserData, user } = useAuth()
  const [avatarUrl, setAvatarUrl] = useState(user.avatar)
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined)
  const toast = useToast()

  const fields = [
    {
      label: 'Email', 
      name: 'email', 
      placeholder: 'mymail@example.com',
      type: 'text'
    },
    {
      label: 'Username', 
      name: 'username',
      placeholder: 'CoolUsername46', 
      type: 'text'
    },
  ]

  const formSchema = z.object({
    email: z.string().trim().email(),
    username: z.string().trim().max(MAX_USERNAME_CH, {
      message: 'The username must not exceed 20 characters'
    }),
  })

  type FormFields = z.infer<typeof formSchema>

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      username: user.username,
    },
  })

  const { formState: { isSubmitting, isDirty } } = form;

  const disableButton = isSubmitting || (!isDirty && !avatarFile)

  async function onSubmit (values: FormFields) {

    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('username', values.username);

    if (avatarFile) { 
      formData.append('avatar', avatarFile); 
    }

    try {
      const res = await api.patch('/users/updateMe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (res.data.status === 'success') {
        toast.success('Account successfuly updated!')
        fetchUserData()
      }

    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
          return toast.error(err.response.data.message);
      }
       return toast.error('Something went wrong, please try again later');
    }
  }

  useEffect(() => {
    if (user) {
      form.reset({
        email: user.email,
        username: user.username,
      });

      setAvatarUrl(user.avatar)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6 w-full'>

      <Dialog>
        <div className='flex item-center justify-center flex-col w-fit gap-2 mx-auto'>
          <Label className='text-center'>Avatar</Label>
          <DialogTrigger asChild>
          <button aria-label='edit avatar' className='relative w-fit rounded-full border-2 p-1 border-primary/55 hover:border-primary'>
            <Avatar className='w-32 h-32'>
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <Camera size={30} className='absolute text-primary right-0 bottom-[10%] fill-white/50 dark:fill-black/50'/>
          </button>
          </DialogTrigger>
        </div>
        <EditAvatarDialog 
          avatarUrl={avatarUrl} 
          setAvatarUrl={setAvatarUrl}
          setAvatarFile={setAvatarFile}
        />
      </Dialog>



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


          <Button type='submit' className='w-full' isLoading={isSubmitting} disabled={disableButton}>Save changes</Button>
        </div>
    </form>
   </Form>
  );
};

export default UpdateUserForm;