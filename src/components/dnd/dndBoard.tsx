import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Status } from '@/types';
import { useTaskBoardApi } from '@/hooks/useTaskboardApi';
import DroppableColumn from './droppableColumn';
import { useTaskBoard } from '@/prodivers/taskboard/taskboardContext';


const DndBoard = () => {

  const { updateTaskApi } = useTaskBoardApi()
  const { state, setState } = useTaskBoard()

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination) return
  
    if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return
    }

    const start = state.columns[source.droppableId] // start position (ex: 'pending')
    const finish = state.columns[destination.droppableId] // end position (ex: 'done')

    // Reorder
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds) // new array of tasks ids of the column
      newTaskIds.splice(source.index, 1) // remove the task from his start location
      newTaskIds.splice(destination.index, 0, draggableId) // add the task at his destination

      // create and push new data to the state
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      }

      setState(newState)
      return
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1) // remove from start loc
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId) // add to final loc
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    updateTaskApi(draggableId, {status: destination.droppableId as Status})

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      },
      tasks: {
        ...state.tasks,
        [draggableId]: {
          ...state.tasks[draggableId],
          status: destination.droppableId as Status
        }
      }
    }

    setState(newState)
  };

  return (
<DragDropContext onDragEnd={onDragEnd}>

    {state.columnOrder.map(columnId => {
      const column = state.columns[columnId]
      const tasks = column.taskIds.map(taskId => state.tasks[taskId])

      return <DroppableColumn
                key={columnId} 
                title={column.title}
                id={column.id}
                tasks={tasks}
               />
    })}

</DragDropContext>
  );
};

export default DndBoard;