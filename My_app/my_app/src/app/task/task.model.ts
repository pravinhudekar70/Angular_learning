export interface NewTaskData {
  title: string;
  summary: string;
  duedate: string;
}   
 export interface Task {
    id: string;
    userId: string;
    title: string;
    summary: string;
    duedate: string;
  }