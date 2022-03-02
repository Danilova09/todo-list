import { ApiUserData, User } from './user.model';

export class Task {
  constructor(
    public id: string,
    public user: User,
    public title: string,
    public status: string,
  ) {}
}

export interface TaskData {
  title: string;
  user: ApiUserData;
}

export interface UpdatedTaskData {
  id: string,
  user: string,
  status: string,
}

export interface ApiTaskData {
  _id: string,
  user: ApiUserData,
  title: string,
  status: string,
}
