import { Task } from '@/types';
import { Draggable } from '@hello-pangea/dnd';

interface DraggableTaskProps {
  task: Task,
  taskIndex: number
}

// DRAGGABLE
const DraggableTask = ({ task, taskIndex } :  DraggableTaskProps) => {

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
          className={`w-full flex justify-center py-3 rounded shadow-md z-50 mb-2 
            ${snapshot.isDragging ? 'bg-primary/50' : 'bg-neutral-300 dark:bg-neutral-600'}`}
          >
          {task.name}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableTask