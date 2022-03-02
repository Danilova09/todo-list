import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { fetchUsersRequest } from '../store/users.actions';
import { NgForm } from '@angular/forms';
import { TaskData } from '../models/task.model';
import { createTaskRequest } from '../store/tasks.actions';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @ViewChild('taskForm') taskForm!: NgForm;
  users: Observable<User[]>

  constructor(private store: Store<AppState>) {
    this.users = this.store.select(state => state.users.users);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchUsersRequest());
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData: TaskData = this.taskForm.value;
      this.store.dispatch(createTaskRequest({taskData}));
    }
  }
}
