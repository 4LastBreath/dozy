import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';
import api from '@/api';
import { useToast } from '@/prodivers/toasts/toastContext';
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/prodivers/auth/authContext';


const DeleteAccountDialog = () => {

  const toast = useToast()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { fetchUserData } = useAuth()

  const deleteAccount = async () => {
    try {
      const res = await api.patch('/users/deleteMe')

      if (res.status === 204) {
        toast.success('Your account has been deleted with success')
        fetchUserData()
        navigate('/')
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        return toast.error(err.response.data.message);
    }
     return toast.error('Something went wrong, please try again later');
    } finally {
      setOpen(false)
    }
  }

  return (
<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
      <Button variant='destructive' className='opacity-50 hover:opacity-100 w-full'><Trash2 size={15} className='mr-1 mb-[2px]'/>Delete My Account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This will disable your account.
        You can recover it later but your data may be lost.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={deleteAccount}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  );
};

export default DeleteAccountDialog;