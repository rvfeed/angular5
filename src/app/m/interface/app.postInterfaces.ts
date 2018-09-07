export interface IPost{
    likes: number;
  delete: boolean;
  comment?:string;
  edit();
  save();
  remove();
  add();
  likeIt();  
}
export type Comment = {
  user: string;
  comment: string;
  date: number;
}
type Record = {
    name: string,
    likes: number;
    status: string[]
    comments: Comment[];
}
export interface Istatus{
  id: string;
  data: Record[]
}