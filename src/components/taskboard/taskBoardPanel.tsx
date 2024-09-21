import { useEffect } from 'react';
import Layout from '@/layouts/layout';
import { useAuth } from '@/prodivers/auth/authContext';
import DndBoard from '@/components/dnd/dndBoard';
import { useTaskBoard } from '@/prodivers/taskboard/taskboardContext';
import TaskBoardHeader from '@/components/taskboard/taskBoardHeader';


const TaskboardPanel = () => {

  const { user, authLoading } = useAuth()
  const { state, getTasksOfList, setLists } = useTaskBoard()

  console.log('State:', state)

  useEffect(() => {

   if (!authLoading) {
    if (user.lists.length !== 0) {
      getTasksOfList(user.lists[0]._id)
      setLists(user.lists)
    }
   }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading])

  return (
<Layout>

  <div className='flex flex-col gap-6 h-full'>

      <TaskBoardHeader />

      <div className='w-full h-[2px] bg-neutral-500/30 max-w-[1130px] mx-auto'/>

      <div className='flex gap-4 h-[calc(100vh-theme(height.header)-8rem-6rem)] justify-center'>

        <DndBoard />
      
      </div>

  </div>

</Layout>
  );
};

export default TaskboardPanel;