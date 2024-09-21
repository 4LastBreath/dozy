import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select"
import AddTaskButton from "./addTaskButton";
import DeleteListButton from "./deleteListButton";
import NewListButton from "./newListButton";
import { useTaskBoard } from "@/prodivers/taskboard/taskboardContext";

const TaskBoardHeader = () => {

  const { lists, isListsEmpty, getTasksOfList, activeListId } = useTaskBoard()

  return (
<div className='w-full flex justify-between max-w-[1130px] mx-auto'>

    <div className='flex gap-2'>
      {!isListsEmpty &&
        <Select onValueChange={(value) => getTasksOfList(value)} value={activeListId} defaultValue={lists[0]._id}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={lists[0].name} />
          </SelectTrigger>
            
              <SelectContent>
                  <SelectGroup>
                    {lists.map(list => {
                      return <SelectItem value={list._id} key={list._id}>{list.name}</SelectItem>
                    })}
                  </SelectGroup>
              </SelectContent>
          
        </Select>
      }

      {!isListsEmpty && <AddTaskButton />}
    </div>

    
    <div className='flex gap-2'>
      
      {!isListsEmpty && <DeleteListButton/>}

      <NewListButton />
    </div>

</div>
  );
};

export default TaskBoardHeader;