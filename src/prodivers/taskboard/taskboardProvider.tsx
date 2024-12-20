import { useState, PropsWithChildren } from 'react';
import { TaskboardContext } from './taskboardContext';
import { TaskBoardState, Task, List, Status } from '@/types';
import { useTaskBoardApi } from '@/hooks/useTaskboardApi';
import { useAuth } from '../auth/authContext';


const TaskboardProvider = ({children}: PropsWithChildren) => {

  const { getListApi } = useTaskBoardApi()
  const { isGuest } = useAuth()


  const initialState: TaskBoardState = {
    tasks: {},
    columns: {
      'todo': {
        id: 'todo',
        title: 'To do',
        taskIds: []
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
  const [lists, setLists] = useState<List[]>([])
  const [activeListId, setActiveListId] = useState('')
  const [isTBLoading, setIsTBLoading] = useState(false)

  const isListsEmpty = lists.length === 0
  const isTaskLimitReached = isGuest ? Object.keys(state.tasks).length >= 30 : Object.keys(state.tasks).length >= 50
  const isListLimitReached = lists.length >= 10

  const tasksArrayToObject = (tasks:Task[]): {[key: string]: Task} => {
    return tasks.reduce((acc, task) => {
      acc[task._id] = task
      return acc
    }, {} as {[key: string] : Task})
  }

  async function getTasksOfList(listId: string) {
    if (activeListId === listId) return;
  
    try {
      setIsTBLoading(true);
      const res = await getListApi(listId);
  
      if (!res || !res.data.list) return;
  
      setActiveListId(listId);

      const tasksByStatus = res.data.list.tasksByStatus; 
  
      // Initialize updated columns with initial state
      const updatedColumns = { ...initialState.columns };

      Object.keys(tasksByStatus).forEach((status) => {
        tasksByStatus[status].forEach((task: Task) => {
          if (!updatedColumns[status].taskIds.includes(task._id)) {
            updatedColumns[status].taskIds.push(task._id);
          }
        });
      });
  
      const newTasksObj = tasksArrayToObject(tasksByStatus.todo.concat(
        tasksByStatus.inProgress,
        tasksByStatus.done
      ));
      
      setState({
        ...initialState,
        tasks: newTasksObj,
        columns: updatedColumns
      });
  
    } catch (err) {
      console.error(err);
    } finally {
      setIsTBLoading(false);
    }
  }

  function createList(newList: List) {
      const id = newList._id

      setActiveListId(id)

      setLists(prev => [
        ...prev, newList
      ])

      setState(initialState)
  }

  function deleteList() {
    setLists(prev => {
      const updatedLists = prev.filter(list => list._id !== activeListId)
  
      if (updatedLists.length !== 0) {
        getTasksOfList(updatedLists[0]._id)
      } else {
        setState(initialState)
      }
  
      return updatedLists
    })
  }

  function createTask(newTask: Task) {
    const id = newTask._id
    const status = newTask.status

    setState(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [id]: newTask
      },
      columns: {
        ...prev.columns,
        [status]: {
          ...prev.columns[status],
          taskIds: [...prev.columns[status].taskIds, id]
        }
      }
    }))
  }

  function updateTask(id: string, {name, description}: {name: string, description: string}) {
    setState(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [id]: {
          ...prev.tasks[id],
          name,
          description
        }
      }
    }))
  }

  function deleteTask(id: string, status: Status) {

    setState(prev => {
      // remove task from tasks by destructuring the obj
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {[id]: _, ...remainingTasks} = prev.tasks
      
      // get the column - filter his tasksIds - create updated col
      const column = prev.columns[status]
      const newTaskIds = column.taskIds.filter(taskId => taskId !== id)

      const updatedColumn = {
        ...column,
        taskIds: newTaskIds
      }

      // push all updated data
      return {
        ...prev,
        tasks: remainingTasks,
        columns: {
          ...prev.columns,
          [status]: updatedColumn
        }
      }
    })

  }

  return (
<TaskboardContext.Provider value={{
  state,
  setState,
  isListsEmpty,
  createList,
  deleteList,
  createTask,
  updateTask,
  deleteTask,
  getTasksOfList,
  isTBLoading,
  lists,
  setLists,
  activeListId,
  isTaskLimitReached,
  isListLimitReached
}}>
      
  {children}

</TaskboardContext.Provider>
  );
};

export default TaskboardProvider;