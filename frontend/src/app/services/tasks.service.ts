import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { ApiTaskData, Task, TaskData, UpdatedTaskData } from '../models/task.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {
  }

  getTasks() {
    return this.http.get<ApiTaskData[]>(environment.apiUrl + '/tasks').pipe(
      map(tasks => {
        return tasks.map(taskData => {
          const userData = new User(taskData.user._id, taskData.user.username)
          return new Task(
            taskData._id,
            userData,
            taskData.title,
            taskData.status,
          );
        });
      })
    );
  }

  createTask(taskData: TaskData) {
    return this.http.post(environment.apiUrl + '/tasks', taskData);
  }

  deleteTask(taskId: string) {
    return this.http.delete(`${environment.apiUrl}/tasks/${taskId}`);
  }

  updateTask(updatedTaskData:  UpdatedTaskData) {
    const body = {
      status: updatedTaskData.status,
      user: updatedTaskData.user,
    }
    return this.http.put(`${environment.apiUrl}/tasks/${updatedTaskData.id}`, body);
  }
}
