export class Task {
  constructor(
    public id: string,
    public user: string,
    public title: string,
    public status: string,
  ) {}
}

export interface ApiTaskData {
  _id: string,
  user: string,
  title: string,
  status: string,
}
