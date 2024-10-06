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
import { useAuth } from "@/prodivers/auth/authContext";
import SkeletonButton from "../ui/skeletonButton";
import { useCurrentWidth } from "@/hooks/useScreenSize";
import { FilePen } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button";

const TaskBoardHeader = () => {

  const { lists, isListsEmpty, getTasksOfList, activeListId } = useTaskBoard()
  const { isGuest, authLoading } = useAuth()
  const { md } = useCurrentWidth()

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

      {(!isListsEmpty || isGuest) && <AddTaskButton />}
    </div>

    {md ?
      <div className='flex gap-2'>
        {(!isGuest && !authLoading) && <NewListButton />}
        {!isListsEmpty && <DeleteListButton/>}
      </div>
      :
      !isListsEmpty ? 
      (<Popover>
          <PopoverTrigger asChild>
              <Button variant='secondary' className='text-neutral-600 rounded-full p-0 h-10 w-10' aria-label='list settings'>
                <FilePen />
              </Button>
          </PopoverTrigger>

          <PopoverContent className="flex flex-col gap-2 bg-surface">
            {!isGuest && (authLoading ? <SkeletonButton /> : <NewListButton />)}
            {!isListsEmpty &&
                <DeleteListButton/>
            }
          </PopoverContent>

        </Popover>
      ) : ((!isGuest && !authLoading) && <NewListButton />)
    }

</div>
  );
};

export default TaskBoardHeader;