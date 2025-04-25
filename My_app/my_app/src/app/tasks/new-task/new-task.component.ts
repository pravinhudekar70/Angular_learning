import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../task-service/tasks.service';

@Component({
  selector: 'app-new-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string;
  @Output() close = new EventEmitter<void>();
  enteredTitle = '';
  enteredSummary = '';
  enteredDuedate = '';

  private tasksService = inject(TasksService);

  onCancle() {
    this.close.emit();
  }

  onCreateTask() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        duedate: this.enteredDuedate,
      },
      this.userId
    );
    this.close.emit();
  }
}
