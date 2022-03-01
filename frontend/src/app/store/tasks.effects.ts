import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksService } from '../services/tasks.service';
import { fetchTasksFailure, fetchTasksRequest, fetchTasksSuccess } from './tasks.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class TasksEffects {
  fetchTasks = createEffect(() => this.actions.pipe(
    ofType(fetchTasksRequest),
    mergeMap(() => this.tasksService.getTasks().pipe(
      map(tasks =>  fetchTasksSuccess({tasks})),
      catchError((e) => of(fetchTasksFailure({error: e})))
    ))
  ));


  constructor(
    private actions: Actions,
    private tasksService: TasksService,
  ) {}
}
