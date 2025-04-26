import { Component, EventEmitter, inject, Input } from '@angular/core';
import { TasksService } from '../tasks/task-service/tasks.service';
import { type Task } from './task.model';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  private tasksService = inject(TasksService);
  @Input({ required: true }) task!: Task;
 

  onCompleteTask() {
    this.tasksService.removeTask(this.task.id);
  }
}
