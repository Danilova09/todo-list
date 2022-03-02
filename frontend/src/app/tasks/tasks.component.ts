import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { fetchTasksRequest } from '../store/tasks.actions';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Observable<Task[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(private store: Store<AppState>) {
    this.tasks = store.select(state => state.tasks.tasks);
    this.loading = store.select(state => state.tasks.fetchLoading);
    this.error = store.select(state => state.tasks.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchTasksRequest());
  }
}
