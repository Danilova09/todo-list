import { Task } from '../models/task.model';

export type TaskState = {
  tasks: Task[],
  fetchLoading: boolean,
  fetchError: null | string,
}

export type AppTaskState = {
  tasks: TaskState,
}
