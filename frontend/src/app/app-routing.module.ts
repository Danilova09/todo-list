import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskFormComponent } from './task-form/task-form.component';

const routes: Routes = [
  {path: '', component: TasksComponent},
  {path: 'add-task', component: TaskFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
