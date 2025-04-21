import { Component, Input } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;
  tasks = [
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

  addTask() {
    alert('Task added');
  }
  selectedUserTasks() {
    return this.tasks.filter((task) => task.userId === this.userId);
  }
  onCompleteTask(taskId: string) {
    alert('Task completed: ' + taskId);
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}
