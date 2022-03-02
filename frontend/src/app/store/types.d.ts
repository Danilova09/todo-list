import { Task } from '../models/task.model';
import { User } from '../models/user.model';

export type TaskState = {
  tasks: Task[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  deleteLoading: boolean,
  deleteError: null | string,
  updateLoading: boolean,
  updateError: null | string,
}

export type UserState = {
  users: User[],
  fetchLoading: boolean,
  fetchError: null | string,
}

export type AppState = {
  tasks: TaskState,
  users: UserState,
}
