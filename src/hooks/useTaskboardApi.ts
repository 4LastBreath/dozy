import api from "@/api"
import { useToast } from "@/prodivers/toasts/toastContext"
import { Status, TaskBoardState } from "@/types"
import { useAuth } from "@/prodivers/auth/authContext"
import axios from "axios"

export const useTaskBoardApi = () => {

  const toast = useToast()
  const { isGuest } = useAuth()

  async function createTaskApi(listId:string, {name, description}: {name: string, description?: string}) {
    if (isGuest) return

    try {
      const task = await api.post('/tasks', {
        name,
        description,
        listId
      })

      return task
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        return toast.error(err.response.data.message);
      }
      return toast.error('Failed to create the task, please try again later');
    }
  }

  async function deleteTaskApi(taskId:string) {
    if (isGuest) return
    try {
      
      await api.delete(`/tasks/${taskId}`)

    } catch (err) {
      toast.error('Failed to delete the task, please try again later')
      console.error(err)
    }
  }

  async function updateTaskApi(taskId:string, {name, description, status}: {name?: string, description?: string, status?: Status}) {
    if (isGuest) return
    try {

      await api.patch(`/tasks/${taskId}`, {
        name,
        description,
        status,
      })

    } catch (err) {
      toast.error('Failed to edit the task, please try again later')
      console.error(err)
    }
  }

  async function createListApi(name: string) {
    if (isGuest) return
    try {
      const res = await api.post('/lists', {name})
      return res
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        return toast.error(err.response.data.message);
      }
      return toast.error('Failed to create the list, please try again later');
    }
  }

  async function getListApi(listId: string) {
    if (isGuest) return
    try {
      const res = await api.get(`/lists/${listId}`)
      return res

    } catch (err) {
      console.error(err)
    }
  }

  async function deleteListApi(listId: string) {
    if (isGuest) return
    try {
      const res = await api.delete(`/lists/${listId}`)

      console.error(res)

      if (res.status === 204) {
        toast.success('Your list has been deleted with success')
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function updateTasksOrderApi(listId: string, newState: TaskBoardState) {
    if (isGuest) return 
    try {
      await api.patch(`/lists/${listId}`, {
        tasksByStatus: {
          todo: newState.columns['todo'].taskIds,
          inProgress: newState.columns['inProgress'].taskIds,
          done: newState.columns['done'].taskIds
        }
      })
    } catch (err) {
      console.error(err)
    }
  }

  return {
    createTaskApi,
    deleteTaskApi,
    updateTaskApi,
    createListApi,
    getListApi,
    deleteListApi,
    updateTasksOrderApi
  }
}