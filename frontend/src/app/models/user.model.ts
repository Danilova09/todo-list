export class User {
  constructor(
    public id: string,
    public username: string | null,
  ) {}
}

export interface ApiUserData {
  _id: string,
  username: string | null,
}
