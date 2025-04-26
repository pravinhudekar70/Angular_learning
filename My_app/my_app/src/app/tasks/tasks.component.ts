import { Component, Input } from '@angular/core';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './task-service/tasks.service';
@Component({
  selector: 'app-tasks',
  providers: [TasksService],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  standalone: false,
 
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
