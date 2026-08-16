import { ApiService } from "@/services/apiService";
import type { ITask } from "@/components/Tasks/Tasks";

export async function getAllTasks(): Promise<ITask[]> {
  try {
    return await ApiService.get<ITask[]>('/tasks')
  } catch {
    return []
  }
}

export async function saveTask(title: string): Promise<ITask> {
  try {
    return ApiService.post<Promise<ITask>>('/tasks', { title })
  } catch (e) {
    throw e
  }
}

export async function deleteTask(id: number) {
  try {
    return ApiService.delete('/tasks', { id })
  } catch (e) {
    throw e
  }
}