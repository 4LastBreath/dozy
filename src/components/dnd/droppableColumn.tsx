import DraggableTask from './draggableTask';
import { Task, Status } from '@/types';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Droppable } from '@hello-pangea/dnd';
import SkeletonTask from '../ui/skeletonTask';
import { useTaskBoard } from '@/prodivers/taskboard/taskboardContext';

interface DroppableColumnProps {
  id: Status,
  tasks: Task[]
  title: string
}

const DroppableColumn = ({id, tasks, title } : DroppableColumnProps) => {

  const { isTBLoading } = useTaskBoard()

  const overColor = {
    todo: 'bg-red-600/10',
    inProgress: 'bg-yellow-600/10',
    done: 'bg-green-600/10'
  }

  const columnTitleVariants = cva(
    'text-white font-semibold rounded-t-lg text-center py-2',
    {
      variants: {
        id: {
          todo: 'bg-red-600',
          inProgress: 'bg-yellow-600',
          done: 'bg-green-600'
        }
      }
    }
  )

  return (
<div className={`h-full flex flex-col w-full max-w-[34rem] rounded-lg border shadow-xl md:max-w-[23rem]`}>
    <h2 className={cn(columnTitleVariants({id}))}>{title}</h2>

    <Droppable droppableId={id}>

      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`h-full max-h-full flex-1 overflow-y-auto overflow-x-hidden w-full rounded-b-lg flex flex-col py-2 px-2 ${snapshot.isDraggingOver ? overColor[id] : 'bg-surface'}`}
        >
          {isTBLoading ? 
            <SkeletonTask /> 
            : 
            tasks.map((task, i) => {
              if (!task) return
              return <DraggableTask task={task} key={task._id} taskIndex={i}/>
            })
          }

            {provided.placeholder}

              
        </div>
      )}

    </Droppable>

</div>
  );
};

export default DroppableColumn;