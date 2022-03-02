import { TaskState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  fetchTasksFailure,
  fetchTasksRequest,
  fetchTasksSuccess,
  createTaskFailure,
  createTaskRequest,
  createTaskSuccess,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFailure,
} from './tasks.actions';

const initialState: TaskState = {
  tasks: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null,
  updateLoading: false,
  updateError: null,
};

export const tasksReducer = createReducer(
  initialState,
  on(fetchTasksRequest, state => ({...state, fetchLoading: true})),
  on(fetchTasksSuccess, (state, {tasks}) => ({...state, fetchLoading: false, tasks})),
  on(fetchTasksFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
  on(createTaskRequest, state => ({...state, createLoading: true})),
  on(createTaskSuccess, state => ({...state, createLoading: false})),
  on(createTaskFailure, (state, {error}) => ({
    ...state, createLoading: false, createError: error
  })),
  on(deleteTaskRequest, state => ({...state, deleteLoading: true})),
  on(deleteTaskSuccess, state => ({...state, deleteLoading: false})),
  on(deleteTaskFailure, (state, {error}) => ({
    ...state, deleteLoading: false, deleteError: error
  })),
  on(updateTaskRequest, state => ({...state, updateLoading: true})),
  on(updateTaskSuccess, state => ({...state, updateLoading: false})),
  on(updateTaskFailure, (state, {error}) => ({
    ...state, updateLoading: false, updateError: error
  })),
);

