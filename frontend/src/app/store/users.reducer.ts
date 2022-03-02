import { UserState } from './types';
import { createReducer, on } from '@ngrx/store';
import { fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess } from './users.actions';

const initialState: UserState = {
  users: [],
  fetchLoading: false,
  fetchError: null,
}

export const usersReducer = createReducer(
  initialState,
  on(fetchUsersRequest, state => ({...state, fetchLoading: true})),
  on(fetchUsersSuccess, (state, {users}) => ({...state, fetchLoading: false, users})),
  on(fetchUsersFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error}))
)

