import api from "@/api"
import { useToast } from "@/prodivers/toasts/toastContext"
import { Status } from "@/types"
import { useAuth } from "@/prodivers/auth/authContext"

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
      toast.error('Failed to create the task, please try again later')
      console.error(err)
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
        status
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
      console.log(err)
    }
  }

  async function getListApi(listId: string) {
    if (isGuest) return
    try {
      const res = await api.get(`/lists/${listId}`)
      return res

    } catch (err) {
      console.log(err)
    }
  }

  async function deleteListApi(listId: string) {
    if (isGuest) return
    try {
      const res = await api.delete(`/lists/${listId}`)

      console.log(res)

      if (res.status === 204) {
        toast.success('Your list has been deleted with success')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return {
    createTaskApi,
    deleteTaskApi,
    updateTaskApi,
    createListApi,
    getListApi,
    deleteListApi
  }
}