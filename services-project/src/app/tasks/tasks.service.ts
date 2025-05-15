import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);
allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substring(2, 9),
      status: 'OPEN',
    };
    this.tasks.set([...this.tasks(), newTask]);
  }
  updateTaskStatus(taskId: string, newStatus: TaskStatus){
    this.tasks.update((tasks) =>
      tasks.map((task: Task) => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  }
}
