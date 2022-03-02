import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { AppState } from '../../store/types';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { fetchUsersRequest } from '../../store/users.actions';
import { deleteTaskRequest, updateTaskRequest } from '../../store/tasks.actions';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  users: Observable<User[]>;
  status!: string;
  username!: string | null;
  userId!: string;
  updatingTask!: boolean;

  constructor(private store: Store<AppState>) {
    this.users = this.store.select(state => (state.users.users));
    this.store.select(state => (state.tasks.updateLoading)).subscribe((updating: boolean) => {
      this.updatingTask = updating;
    });
  }

  ngOnInit(): void {
    this.status = this.task.status;
    this.username = this.task.user.username;
    this.store.dispatch(fetchUsersRequest());
  }

  delete() {
    this.store.dispatch(deleteTaskRequest({taskId: this.task.id}));
  }

  onStatusChange() {
    const updatedTaskData = {
      id: this.task.id,
      user: this.userId,
      status: this.status,
    }
    this.store.dispatch(updateTaskRequest({updatedTaskData}));
  }

  userChange(user: User) {
    this.userId = user.id;
    const updatedTaskData = {
      id: this.task.id,
      user: this.userId,
      status: this.status,
    }
    this.store.dispatch(updateTaskRequest({updatedTaskData}));
  }
}
