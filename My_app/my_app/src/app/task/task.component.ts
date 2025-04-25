import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CardComponent } from "../shared/card/card.component";
import { CommonModule } from '@angular/common';
import { TasksService } from '../tasks/task-service/tasks.service';
import { type Task } from './task.model';

@Component({
  selector: 'app-task',
  imports: [CardComponent, CommonModule],
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
