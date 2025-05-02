import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useState } from 'react';
import { BriefcaseBusiness, Dumbbell, Pizza, Bed } from 'lucide-react';
import DroppableRow from './droppableRow';
import { DemoState } from '@/types';
import { flushSync } from 'react-dom';


const DndDemo = () => {

  const [state, setState] = useState<DemoState>({
    tasks: {
      '1': {
        id: '1',
        logo: <BriefcaseBusiness size={40} className='text-amber-700 pointer-events-none'/>
      },
      '2': {
        id: '2',
        logo: <Dumbbell size={40} className='text-slate-500 pointer-events-none'/>
      },
      '3': {
        id: '3',
        logo: <Pizza size={40} className='text-green-600 pointer-events-none'/>
      },
      '4': {
        id: '4',
        logo: <Bed size={40} className='text-blue-400 pointer-events-none'/>
      }
    },
    tasksOrder: ['1', '2', '3', '4']
  })

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    // Reorder
    const newTasksOrder = Array.from(state.tasksOrder) // new array of tasks ids of the row
    newTasksOrder.splice(source.index, 1) // remove the task from his start location
    newTasksOrder.splice(destination.index, 0, draggableId) // add the task at his destination

    // create and push new data to the state
    const newState = {
      ...state,
      tasksOrder: newTasksOrder
    };

    flushSync(() => {
      setState(newState)
    })
  };

  return (
<DragDropContext onDragEnd={onDragEnd}>
  
  <DroppableRow state={state} key='demo'/>

</DragDropContext>
  );
};

export default DndDemo;