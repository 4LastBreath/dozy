import React from 'react';
import { Status, Task } from '@/types';
import { Draggable } from '@hello-pangea/dnd';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useTaskBoardApi } from '@/hooks/useTaskboardApi';
import { DeleteCancelButton, EditValidButton, MoveToButton } from '../taskboard/taskButtons';
import { MAX_TASK_NAME_CH, MAX_TASK_DESCRIPTION_CH } from '@/utils/maxLength';
import { useTaskBoard } from '@/prodivers/taskboard/taskboardContext';

interface DraggableTaskProps {
  task: Task,
  taskIndex: number
}

// DRAGGABLE
const DraggableTask = ({ task, taskIndex } :  DraggableTaskProps) => {

  const { updateTaskApi, deleteTaskApi } = useTaskBoardApi()
  const { updateTask, deleteTask, state, setState } = useTaskBoard()
  const [isEditing, setIsEditing] = useState(false)
  const [taskName, setTaskName] = useState(task.name)
  const [taskNameError, setTaskNameError] = useState('')
  const [taskDescription, setTaskDescription] = useState(task.description)

  const status = task.status
  const id = task._id
  const isoDate = task.createdAt;
  const date = new Date(isoDate);

  const filteredStatus = state.columnOrder.filter(col => col !== status)

  const options: Intl.DateTimeFormatOptions = {
    dateStyle: 'short',
  };

  const formattedDate = date.toLocaleDateString('en-GB', options);

  const taskNameVariants = cva(
    'font-semibold text-xl max-w-[240px] overflow-hidden text-ellipsis',
    {
      variants: {
        status: {
          todo: 'text-red-600 dark:text-[#eb5656]',
          inProgress: 'text-yellow-600',
          done: 'text-green-500'
        }
      }
    }
  )

  const draggingColors = {
    todo: 'bg-red-600/25',
    inProgress: 'bg-yellow-600/25',
    done: 'bg-green-500/25'
  }

  function editTask() {
    if (taskName === task.name && taskDescription === task.description) {
      return setIsEditing(false)
    }

    if (!taskName) {
      return setTaskNameError('A name is required')
    }

    const id = task._id

    updateTaskApi(id, {name: taskName, description: taskDescription})
    updateTask(id, {name: taskName, description: taskDescription})
    
    setIsEditing(false)
  }

  function editTaskSubmit(e: React.FormEvent) {
    e.preventDefault()
    editTask()
  }

  function cancelEdit() {
    setTaskDescription(task.description)
    setTaskName(task.name)
    setIsEditing(false)
  }

  function removeTask() {
    const id = task._id
    
    deleteTaskApi(id)
    deleteTask(id, status)
  }

  function moveTo(newStatus: Status) {
    updateTaskApi(id, {status: newStatus})

    const startTaskIds = Array.from(state.columns[status].taskIds);
    startTaskIds.splice(taskIndex, 1);

    const finishTaskIds = Array.from(state.columns[newStatus].taskIds);
    finishTaskIds.push(id);

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [status]: {
          ...state.columns[status],
          taskIds: startTaskIds
        },
        [newStatus]: {
          ...state.columns[newStatus],
          taskIds: finishTaskIds
        }
      },
      tasks: {
        ...state.tasks,
        [id]: {
          ...state.tasks[id],
          status: newStatus
        }
      }
    }

    setState(newState)
  }

  return (
    <Draggable
      draggableId={task._id}
      index={taskIndex}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className={`w-full flex rounded shadow-md z-10 mb-2 border border-neutral-300 dark:border-neutral-700 overflow-hidden shrink-0
            ${snapshot.isDragging ? draggingColors[status] : 'bg-neutral-50 dark:bg-neutral-600'}`}
          >

          <div className='flex flex-col flex-1 gap-2 px-4 py-3'>

            {isEditing ?
              <form onSubmit={editTaskSubmit} className='flex flex-col gap-3'>
                <Input type='text' value={taskName} 
                  onChange={(e) => setTaskName(e.target.value)} 
                  placeholder='name...' 
                  maxLength={MAX_TASK_NAME_CH}
                />
                {taskNameError && <p className="text-sm text-destructive ml-1">{taskNameError}</p>}

                <Textarea 
                  value={taskDescription} 
                  onChange={(e) => setTaskDescription(e.target.value)} 
                  className='resize-none' 
                  placeholder='description...' 
                  maxLength={MAX_TASK_DESCRIPTION_CH}
                />
                <button type="submit" className="hidden"></button>
              </form> : 
              <>
                <h3 className={cn(taskNameVariants({status}))}>{taskName}</h3>
                {task.description && <p className=' text-neutral-600 dark:text-neutral-300 font-medium'>{taskDescription}</p>}
              </>
            }
            
            <div className='w-full flex items-center justify-between'>
              <p className='opacity-60 text-sm mt-2'>{formattedDate}</p>

              <div className='flex md:hidden'>
                {filteredStatus.map(status => (
                  <MoveToButton moveTo={moveTo} status={status} taskName={task.name} key={status}/>
                ))}
              </div>
            </div>
          </div>

          <div className={`w-8 h-full ${snapshot.isDragging && 'opacity-60'}`}>

            <EditValidButton
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              taskName={taskName}
              editTask={editTask}
            />

            <div className='w-full h-[2px] bg-neutral-50 dark:bg-neutral-600' />

            <DeleteCancelButton
              isEditing={isEditing}
              taskName={taskName}
              deleteTask={removeTask}
              cancelEdit={cancelEdit}
            />

          </div>

        </div>
      )}
    </Draggable>
  );
};

export default DraggableTask