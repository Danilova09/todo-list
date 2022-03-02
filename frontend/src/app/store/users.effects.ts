import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users.service';
import { fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess } from './users.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UsersEffects {
  fetchUsers = createEffect(() => this.actions.pipe(
    ofType(fetchUsersRequest),
    mergeMap(() => this.usersService.getUser().pipe(
      map(users => fetchUsersSuccess({users})),
      catchError((e) => of(fetchUsersFailure({error: e})))
    ))
  ));


  constructor(
    private actions: Actions,
    private usersService: UsersService,
  ) {
  }
}

