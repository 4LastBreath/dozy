import { DemoState } from "@/types";
import { Droppable } from "@hello-pangea/dnd";
import DraggableDemoTask from "./draggableDemoTask";

interface DroppableRowProps {
  state: DemoState
}

const DroppableRow = ({state} : DroppableRowProps) => {
  return (
<Droppable droppableId='demo' direction='horizontal'>
    {(provided) => (
      <div
        className='flex py-2 bg-surface pl-2 w-fit rounded-md shadow-md mt-5'
        ref={provided.innerRef}
        {...provided.droppableProps}
      >

      {state.tasksOrder.map((taskId, i) => {
        const task = state.tasks[taskId];
            
        return (
          <DraggableDemoTask
            task={task}
            taskIndex={i}
            key={task.id}
          />
        );
      })}

        {provided.placeholder}
      </div>
    )}
</Droppable>
  );
};

export default DroppableRow;