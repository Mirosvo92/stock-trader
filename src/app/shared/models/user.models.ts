export class User {
  balance = 10000;
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public id?: number,
  ) {
  }
}
