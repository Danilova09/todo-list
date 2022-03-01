import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { ApiTaskData, Task } from '../models/task.model';

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
          return new Task(
            taskData._id,
            taskData.user,
            taskData.title,
            taskData.status,
          );
        });
      })
    );
  }
}
