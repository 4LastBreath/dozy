import { useState } from 'react';
import Layout from '@/layouts/layout';
import { Status, TaskBoardState } from '@/types';
import DroppableColumn from '@/components/dnd/droppableColumn';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

const Taskboard = () => {

  const initialState: TaskBoardState = {
    tasks: {
      "1": {
        _id: '1',
        name: 'Task 1',
        description: 'Description 1',
        createdAt: new Date(Date.now()),
        status: 'todo',
        listId: '1'
      },
      "2": {
        _id: '2',
        name: 'Task 2',
        description: 'Description 2',
        createdAt: new Date(Date.now()),
        status: 'todo',
        listId: '2'
      },
      "3": {
        _id: '3',
        name: 'Task 3',
        description: 'Description 3',
        createdAt: new Date(Date.now()),
        status: 'todo',
        listId: '3'
      },
      "4": {
        _id: '4',
        name: 'Task 4',
        description: 'Description 4',
        createdAt: new Date(Date.now()),
        status: 'todo',
        listId: '4'
      },
    },
    columns: {
      'todo': {
        id: 'todo',
        title: 'todo',
        taskIds: ['1', '2', '3', '4']
      },
      'inProgress': {
        id: 'inProgress',
        title: 'In Progress',
        taskIds: []
      },
      'done': {
        id: 'done',
        title: 'Done',
        taskIds: []
      }
    },
    columnOrder: ['todo', 'inProgress', 'done']
  }

  const [state, setState] = useState<TaskBoardState>(initialState);

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
<Layout>

    <div className='flex gap-4 h-full'>

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

    </div>

</Layout>
  );
};

export default Taskboard;