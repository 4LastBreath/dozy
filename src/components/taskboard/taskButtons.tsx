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
import { ArrowUp, ArrowDown } from 'lucide-react';


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
  taskStatus: Status,
  newStatus: Status,
  taskName: string
}

export const MoveToButton = ({ newStatus, taskStatus, moveTo, taskName }: MoveToButtonProps) => {

  const bgVariants = cva(
    'w-8 h-8 rounded-full flex items-center justify-center',
    {
      variants: {
        newStatus: {
          todo: 'bg-red-600 dark:bg-[#eb5656]',
          inProgress: 'bg-yellow-500 dark:bg-yellow-600',
          done: 'bg-green-500'
        }
      }
    }
  )

  const getArrow = () => {
    if (taskStatus === 'todo' || (taskStatus === 'inProgress' && newStatus === 'done')) {
      return <ArrowUp strokeWidth={3} opacity={0.8} color='white'/>;
    }
    if (taskStatus === 'done' || (taskStatus === 'inProgress' && newStatus === 'todo')) {
      return <ArrowDown strokeWidth={3} opacity={0.8} color='white'/>;
    }
    return null;
  };

  return (
    <button
      className='py-2 px-[0.35rem] hover:brightness-110'
      onClick={() => moveTo(newStatus)}
      aria-label={`move task ${taskName} to ${newStatus}`}
    >
      <div className={cn(bgVariants({newStatus}))}>
        {getArrow()}
      </div>
    </button>
  )
}


