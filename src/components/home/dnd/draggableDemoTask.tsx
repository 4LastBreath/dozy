import { Draggable } from "@hello-pangea/dnd";
import { DemoTask } from "@/types";

interface DraggableDemoTaskProps {
  task: DemoTask,
  taskIndex: number
}

const DraggableDemoTask = ({task, taskIndex} : DraggableDemoTaskProps) => {
  return (
    <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
      {(provided, snapshot) => (
        <div 
          {...provided.draggableProps} 
          {...provided.dragHandleProps} 
          ref={provided.innerRef}
          className={`p-4 ${snapshot.isDragging ? 'bg-card/70' : 'bg-card'} mr-2 rounded shadow`}
        >
            {task.logo}
        </div>
      )}
  </Draggable>
  );
};

export default DraggableDemoTask;