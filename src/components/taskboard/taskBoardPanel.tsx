import { useEffect, useState } from 'react';
import Layout from '@/layouts/layout';
import { useAuth } from '@/prodivers/auth/authContext';
import DndBoard from '@/components/taskboard/dnd/dndBoard';
import { useTaskBoard } from '@/prodivers/taskboard/taskboardContext';
import TaskBoardHeader from '@/components/taskboard/taskBoardHeader';
import { useLocalStorage } from '@/hooks/useLocalStorage';


const TaskboardPanel = () => {

  const { user, authLoading, isGuest, fetchUserData } = useAuth()
  const { state, setState, getTasksOfList, setLists } = useTaskBoard()
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage('gstate')
  const [ activeLocalStorage, setActiveLocalStorage ] = useState(false)

  console.log('State:', state)

  useEffect(() => {
    if (!isGuest) {
      fetchUserData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest])

  useEffect(() => {

   if (!authLoading) {

    setActiveLocalStorage(false)

    if (user.lists.length !== 0) {
      console.log('trigger')
      getTasksOfList(user.lists[0]._id)
      setLists(user.lists)
    }

    if (isGuest) {
      const guestState = getLocalStorageItem()
      setActiveLocalStorage(true)
      setState(guestState)
    }
   }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, isGuest, fetchUserData])

  useEffect(() => {
    if (isGuest && !authLoading && activeLocalStorage) {
        setLocalStorageItem(state)
        console.log('setLocal trigger', state)
    }
  }, [state, isGuest, setLocalStorageItem, authLoading, activeLocalStorage])

  return (
<Layout>

  <div className='flex flex-col gap-6 h-full'>

      <TaskBoardHeader />

      <div className='w-full h-[2px] bg-neutral-500/30 max-w-[1130px] mx-auto'/>

      <DndBoard />

  </div>

</Layout>
  );
};

export default TaskboardPanel;