import DraggableTask from './draggableTask';
import { Task, Status } from '@/types';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Droppable } from '@hello-pangea/dnd';

interface DroppableColumnProps {
  id: Status,
  tasks: Task[]
  title: string
}

const DroppableColumn = ({id, tasks, title} : DroppableColumnProps) => {

  const overColor = {
    todo: 'bg-red-600/15',
    inProgress: 'bg-yellow-600/15',
    done: 'bg-green-600/15'
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
<div className={`h-full w-[20rem] max-h-[700px] rounded-lg border shadow-xl`}>
    <h2 className={cn(columnTitleVariants({id}))}>{title}</h2>

    <Droppable droppableId={id}>

      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`h-full max-h-[calc(100%-40px)] overflow-y-auto overflow-x-hidden w-full rounded-b-lg flex flex-col py-2 px-2 ${snapshot.isDraggingOver ? overColor[id] : 'bg-surface'}`}
        >

            {tasks.map((task, i) => (
              <DraggableTask task={task} key={task._id} taskIndex={i}/>
            ))}

            {provided.placeholder}

              
        </div>
      )}

    </Droppable>

</div>
  );
};

export default DroppableColumn;