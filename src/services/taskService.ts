import { deleteRequest, getRequest, postRequest } from "@/api/api";
import type { ITask } from "@/components/Tasks/Tasks";

export async function getAllTasks(): Promise<ITask[]> {
  try {
    return await getRequest('tasks') as Promise<ITask[]>
  } catch {
    return []
  }
}

export async function saveTask(title: string): Promise<ITask> {
  try {
    return postRequest('tasks', { title }) as Promise<ITask>
  } catch (e) {
    throw e
  }
}

export async function deleteTask(id: number) {
  try {
    return deleteRequest('tasks', { id })
  } catch (e) {
    throw e
  }
}