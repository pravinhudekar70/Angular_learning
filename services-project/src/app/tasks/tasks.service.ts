import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {


  tasks:Task[] = [];
 
 
  addTask(taskData: { title: string; description: string; }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substring(2, 9),
      status: 'OPEN'
    };

    this.tasks.push(newTask);
  }
}
