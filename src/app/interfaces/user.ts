export interface IUser
{
  id: number
  name: string
  birth: string
  email: string,
  photo: string,
  role: string,
  status: string,
  news: [{
    description: string,
    item_id: string,
    title: string
  }]
}
