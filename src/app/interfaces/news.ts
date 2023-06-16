import {IUser} from "./user";

export interface IPost
{
  id: number,
  time: string,
  prettyDate: string,
  description: string,
  author: IUser,
}
