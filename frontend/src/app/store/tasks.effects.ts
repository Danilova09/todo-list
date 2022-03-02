import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksService } from '../services/tasks.service';
import {
  createTaskFailure,
  createTaskRequest,
  createTaskSuccess,
  fetchTasksFailure,
  fetchTasksRequest,
  fetchTasksSuccess,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure, updateTaskRequest, updateTaskSuccess, updateTaskFailure
} from './tasks.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TasksEffects {
  fetchTasks = createEffect(() => this.actions.pipe(
    ofType(fetchTasksRequest),
    mergeMap(() => this.tasksService.getTasks().pipe(
      map(tasks => fetchTasksSuccess({tasks})),
      catchError((e) => of(fetchTasksFailure({error: e})))
    ))
  ));

  createTask = createEffect(() => this.actions.pipe(
    ofType(createTaskRequest),
    mergeMap(({taskData}) => this.tasksService.createTask(taskData)
      .pipe(
        map(() => createTaskSuccess()),
        tap(() => this.router.navigate(['/'])),
        catchError(() => {
          return of(createTaskFailure({
            error: 'Wrong data'
          }));
        })
      )
    )
  ));

  deleteTask = createEffect(() => this.actions.pipe(
    ofType(deleteTaskRequest),
    mergeMap(({taskId}) => this.tasksService.deleteTask(taskId)
      .pipe(
        map(() => deleteTaskSuccess()),
        tap(() => window.location.reload()),
        catchError((e) => of(deleteTaskFailure({error: e})))
      )
    )
  ));

  updateTask = createEffect(() => this.actions.pipe(
    ofType(updateTaskRequest),
    mergeMap(({updatedTaskData}) => this.tasksService.updateTask(updatedTaskData)
      .pipe(
        map(() => updateTaskSuccess()),
        catchError((e) => of(updateTaskFailure({error: e})))
      )
    )
  ));

  constructor(
    private actions: Actions,
    private tasksService: TasksService,
    private router: Router,
  ) {}
}
