import { Pencil, Trash2, Check, X } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Status } from '@/types';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';


interface TaksButtonsProps {
  isEditing: boolean
  taskName: string
}

interface EditValidButtonProps extends TaksButtonsProps {
  editTask: () => void
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditValidButton = ({isEditing, setIsEditing, taskName, editTask} : EditValidButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        <button className={`h-[50%] w-full flex items-center justify-center bg-neutral-200 text-neutral-600
          hover:bg-neutral-300 ${isEditing ? 'hover:text-green-600 dark:hover:text-green-400' : 'hover:text-blue-600 dark:hover:text-blue-400'}
          dark:bg-neutral-700 dark:text-neutral-400  dark:hover:bg-neutral-800/70`}
          aria-label={`${isEditing ? 'save changes' : `edit task ${taskName}`}`}
          onClick={isEditing ? editTask : () => setIsEditing(true)}
        >
          {isEditing ? <Check /> : <Pencil />}
        </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isEditing ? 'Valid' : 'Edit'}</p>
        </TooltipContent>
      </Tooltip>
  </TooltipProvider>
  )
}

interface DeleteCancelButtonProps extends TaksButtonsProps {
  cancelEdit: () => void
  deleteTask: () => void
}

export const DeleteCancelButton = ({isEditing, cancelEdit, taskName, deleteTask, } : DeleteCancelButtonProps) => {
  return (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <button className='h-[50%] w-full flex items-center justify-center bg-neutral-200 text-neutral-600
          hover:bg-neutral-300 hover:text-red-600 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:text-red-400 dark:hover:bg-neutral-800/70'
          aria-label={`${isEditing ? 'cancel edit' : `delete task ${taskName}`}`}
          onClick={isEditing ? cancelEdit : deleteTask}
        >
          {isEditing ? <X /> : <Trash2 />}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isEditing ? 'Cancel' : 'Delete'}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  )
}

interface MoveToButtonProps {
  moveTo: (status: Status) => void,
  status: Status,
  taskName: string
}

export const MoveToButton = ({ status, moveTo, taskName }: MoveToButtonProps) => {

  const bgVariants = cva(
    'w-5 h-5 rounded-full',
    {
      variants: {
        status: {
          todo: 'bg-red-600 dark:bg-[#eb5656]',
          inProgress: 'bg-yellow-600',
          done: 'bg-green-500'
        }
      }
    }
  )

  return (
    <button
      className='py-4 px-[0.35rem] hover:brightness-110'
      onClick={() => moveTo(status)}
      aria-label={`move task ${taskName} to ${status}`}
    >
      <div className={cn(bgVariants({status}))}/>
    </button>
  )
}


