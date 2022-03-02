import { createAction, props } from '@ngrx/store';
import { Task, TaskData, UpdatedTaskData } from '../models/task.model';

export const fetchTasksRequest = createAction('[Tasks] Fetch Request');
export const fetchTasksSuccess = createAction('[Tasks] Fetch Success', props<{ tasks: Task[] }>());
export const fetchTasksFailure = createAction('[Tasks] Fetch Failure', props<{ error: string }>());

export const createTaskRequest = createAction('[Tasks] Create Request', props<{ taskData: TaskData }>());
export const createTaskSuccess = createAction('[Tasks] Create Success');
export const createTaskFailure = createAction('[Tasks] Create Failure', props<{ error: string }>());

export const deleteTaskRequest = createAction('[Tasks] Delete Request', props<{ taskId: string }>());
export const deleteTaskSuccess = createAction('[Tasks] Delete Success');
export const deleteTaskFailure = createAction('[Tasks] Delete Failure', props<{ error: string }>());

export const updateTaskRequest = createAction('[Tasks] Update Request', props<{ updatedTaskData: UpdatedTaskData }>());
export const updateTaskSuccess = createAction('[Tasks] Update Success');
export const updateTaskFailure = createAction('[Tasks] Update Failure', props<{ error: string }>());
