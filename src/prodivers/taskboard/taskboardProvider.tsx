import { useState, PropsWithChildren } from 'react';
import { TaskboardContext } from './taskboardContext';
import { TaskBoardState, Task, List, Status } from '@/types';
import { useTaskBoardApi } from '@/hooks/useTaskboardApi';



const TaskboardProvider = ({children}: PropsWithChildren) => {

  const { getListApi } = useTaskBoardApi()

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

  const tasksArrayToObject = (tasks:Task[]): {[key: string]: Task} => {
    return tasks.reduce((acc, task) => {
      acc[task._id] = task
      return acc
    }, {} as {[key: string] : Task})
  }

  async function getTasksOfList(listId: string) {

    if (activeListId === listId) return

    try {
      setIsTBLoading(true)

      const res = await getListApi(listId)

      if (!res || !res.data.list) return

      setActiveListId(listId)
      const tasks = res.data.list.tasks

      const updatedColumns = { ...initialState.columns };

      tasks.forEach((task: Task) => {
        updatedColumns[task.status].taskIds.push(task._id);
      });

      const newTasksObj = tasksArrayToObject(tasks)
      
      // renit state and set the new data from res
      setState({
        ...initialState,
          tasks: newTasksObj,
          columns: updatedColumns
      })

    } catch (err) {
      console.log('error:', err)
    } finally {
      setIsTBLoading(false)
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
}}>
      
  {children}

</TaskboardContext.Provider>
  );
};

export default TaskboardProvider;