export type MongoUserType = {
  _id: string;
  rooms: Array<IRoom>;
  email: string;
  name: string | null;
  password: string;
  registrationDate: Date;
};

interface IRoom {
  name: string;
  participants: Array<User>;
  messages: Array<IMessage>;
}
interface IMessage {
  text: string;
  sender: User;
  timestamp: Date;
}
export class User {
  readonly email: string;
  readonly name: string | null;
  readonly password: string;
  private _registrationDate: Date;
  private _rooms: Array<IRoom>;

  constructor(
    email: string,
    password: string,
    name: string | null = null,
    rooms: Array<IRoom> = []
  ) {
    this.email = email;
    this.name = name;
    this.password = password;
    this._registrationDate = new Date();
    this._rooms = rooms;
  }

  public set rooms(rooms: Array<IRoom>) {
    this._rooms = rooms;
  }

  public get rooms(): Array<IRoom> {
    return this._rooms;
  }

  public set registrationDate(date) {
    this._registrationDate = date;
  }

  public get registrationDate(): Date {
    return this._registrationDate;
  }
}
