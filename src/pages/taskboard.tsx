import TaskboardPanel from "@/components/taskboard/taskBoardPanel";
import TaskboardProvider from "@/prodivers/taskboard/taskboardProvider";


const Taskboard = () => {

  document.title = 'Dozy - TaskBoard'

  return (
  <TaskboardProvider>

    <TaskboardPanel />

  </TaskboardProvider>
  );
};

export default Taskboard;