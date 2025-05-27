import { Component, computed, inject, input, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterModule],
})
export class TasksComponent {
  userId = input.required<string>();
  // order = input<'asc' | 'desc'>();
  order = signal<'asc' | 'desc'>('asc'); // Default order is ascending
  private tasksService = inject(TasksService);
  userTasks = computed(() =>
    this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId())
      .sort((a, b) => {
        if (this.order() === 'desc') {
          if (a.id > b.id) return -1;
          if (a.id < b.id) return 1;
          return 0;
        } else {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        }
      })
  );
  private activatedRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (params) => this.order.set(params['order']),
    });
  }
}
