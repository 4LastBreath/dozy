import { useState, useEffect } from "react";
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
import { Textarea } from '@/components/ui/textarea';
import { MAX_TASK_NAME_CH, MAX_TASK_DESCRIPTION_CH } from '@/utils/maxLength';
import { Button } from '../ui/button';
import { useTaskBoardApi } from "@/hooks/useTaskboardApi";
import { Plus } from "lucide-react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTaskBoard } from "@/prodivers/taskboard/taskboardContext";

const AddTaskButton = () => {

  const { createTaskApi } = useTaskBoardApi()
  const { createTask, activeListId } = useTaskBoard()

  const [open, setOpen] = useState(false)

  const formSchema = z.object({
    name: z.string().trim().min(1, { message: "A name is required" }),
    description: z.string().trim(),
  });

  type FormFields = z.infer<typeof formSchema>

  const { handleSubmit, register, formState: { isSubmitting, errors }, reset} = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const addTask:SubmitHandler<FormFields> = async (values: FormFields) => {

    const res = await createTaskApi(activeListId, {
      name: values.name, 
      description: values.description
    })

    if (!res) return

    const newTask = res.data.task

    createTask(newTask)

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
      <Button><Plus className="mr-2"/>Add Task</Button>
    </DialogTrigger>

    <DialogContent>
      <form onSubmit={handleSubmit(addTask)} className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Add task</DialogTitle>
          <DialogDescription>
            Choose a name to add a new task to this list. <br />
            The description is optionnal.
          </DialogDescription>
        </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor='addTask-name'>Name</Label>
            <Input 
              type='text' 
              id='addTask-name' 
              maxLength={MAX_TASK_NAME_CH} 
              placeholder='name...' 
              {...register('name')}
            />
            {errors.name && <p className="text-sm text-destructive ml-1">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor='addTask-description'>Description</Label>     
            <Textarea 
              id='addTask-description' 
              className='resize-none' 
              maxLength={MAX_TASK_DESCRIPTION_CH} 
              placeholder='description...'
              {...register('description')}
            />
          </div>

        <DialogFooter>
            <Button className='w-full mt-1' type="submit" disabled={isSubmitting} isLoading={isSubmitting}>Add</Button>
        </DialogFooter>
      </form>
    </DialogContent>

</Dialog>
  );
};

export default AddTaskButton;