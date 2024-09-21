import React, { useState } from 'react';
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
import { Button } from '../ui/button';
import { useTaskBoardApi } from '@/hooks/useTaskboardApi';
import { useTaskBoard } from '@/prodivers/taskboard/taskboardContext';

const DeleteListButton = () => {

  const { deleteListApi } = useTaskBoardApi()
  const { deleteList, activeListId } = useTaskBoard()

  const [open, setOpen] = useState(false)

  async function removeList(e: React.FormEvent) {

    e.preventDefault()

    await deleteListApi(activeListId)

    deleteList()
    
    setOpen(false)
  }

  return (
<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
      <Button variant='destructive'>Delete This List</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={removeList}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  );
};

export default DeleteListButton;