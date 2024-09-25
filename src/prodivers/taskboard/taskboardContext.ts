import React, { createContext, useContext } from "react";
import { TaskBoardState, List, Task, Status } from "@/types";

type TaskboardContextValues = {
  state: TaskBoardState
  setState: React.Dispatch<React.SetStateAction<TaskBoardState>>
  isListsEmpty: boolean
  lists: List[]
  setLists: React.Dispatch<React.SetStateAction<List[]>>
  createTask: (newTask: Task) => void
  updateTask: (id: string, {name, description}: {name: string, description:string}) => void
  deleteTask: (id: string, status: Status) => void
  createList: (newList: List) => void
  deleteList: () => void
  getTasksOfList: (listId: string) => void
  isTBLoading: boolean
  activeListId: string,
  isTaskLimitReached: boolean
  isListLimitReached: boolean
}

export const TaskboardContext = createContext<TaskboardContextValues | null>(null)

export const useTaskBoard = () => {
  const taskboardContext = useContext(TaskboardContext)

  if (!taskboardContext) {
    throw new Error('useTaskboard must be used within <TaskboardContext.Provider>')
  }

  return taskboardContext
}