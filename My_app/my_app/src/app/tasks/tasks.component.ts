import { Component, Input } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './task-service/tasks.service';
@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, CommonModule, NewTaskComponent],
  providers: [TasksService],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;

  isAddingTask = false;

  constructor(private tasksService: TasksService) {}
  

  addTask() {
    this.isAddingTask = true;
  }
  selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId);
  }
  oncloseAddTask() {
    this.isAddingTask = false;
  }
 
}
