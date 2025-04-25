import { Injectable } from '@angular/core';
import { NewTaskData } from '../../task/task.model';
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  
 private tasks = [
    { 
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn Angular from scratch learn all the basic and advanced features of Angular',
      duedate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u1',
      title: 'Build a Portfolio Website',
      summary:
        'Create a personal portfolio website to showcase projects, skills, and experience.',
      duedate: '2025-11-15',
    },
    {
      id: 't3',
      userId: 'u2',
      title: 'Learn TypeScript',
      summary:
        'Understand TypeScript fundamentals including types, interfaces, and generics.',
      duedate: '2025-10-01',
    },
    {
      id: 't4',
      userId: 'u3',
      title: 'Contribute to Open Source',
      summary:
        'Pick an open-source Angular project on GitHub and contribute with meaningful pull requests.',
      duedate: '2025-09-30',
    },
  ];
  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }


  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }
  addTask(taskData: NewTaskData , userId: string) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      duedate: taskData.duedate,
    });
    this.saveTasks();
  }
  removeTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
  }
  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
