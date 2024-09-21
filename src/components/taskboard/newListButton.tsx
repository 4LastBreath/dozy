import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MAX_LIST_NAME_CH } from '@/utils/maxLength';
import { Button } from '../ui/button';
import { useTaskBoardApi } from '@/hooks/useTaskboardApi';
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTaskBoard } from '@/prodivers/taskboard/taskboardContext';

const NewListButton = () => {

  const { createListApi } = useTaskBoardApi()
  const { createList } = useTaskBoard()

  const [open, setOpen] = useState(false)

  const formSchema = z.object({
    name: z.string().trim().min(1, { message: "A name is required" }),
  });

  type FormFields = z.infer<typeof formSchema>

  const { handleSubmit, register, formState: { isSubmitting, errors }, reset} = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const createNewList:SubmitHandler<FormFields> = async (values: FormFields) =>{

    const res = await createListApi(values.name)

    if (!res) return

    const newList = res.data.list
    createList(newList)

    reset()
    setOpen(false)
  }

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        reset()
      }, 200)
    }
  }, [open, reset])

  return (
<Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button variant='secondary'>New List</Button>
    </DialogTrigger>

    <DialogContent>

      <DialogHeader>
        <DialogTitle>Create a new list</DialogTitle>
        <DialogDescription>
          Choose a name for your new list.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(createNewList)} className="flex flex-col gap-4">

      <div className='flex flex-col gap-2'>
        <Label htmlFor='addTask-name'>Name</Label>
        <Input 
          type='text' 
          id='addTask-name' 
          maxLength={MAX_LIST_NAME_CH} 
          placeholder='name...'
          {...register('name')}
        />
        {errors.name && <p className="text-sm text-destructive ml-1">{errors.name.message}</p>}
      </div>

      <DialogFooter>
        <Button className='w-full mt-1' disabled={isSubmitting} isLoading={isSubmitting}>Create</Button>
      </DialogFooter>
      </form>
    </DialogContent>
</Dialog>
  );
};

export default NewListButton;