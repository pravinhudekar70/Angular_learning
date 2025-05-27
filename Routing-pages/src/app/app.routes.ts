import { Route, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId', //<your-domain>/users/<userId>
    component: UserTasksComponent,
    children: [
        {
            path: '', // <your-domain>/users/<userId>
            redirectTo: 'tasks', // Redirect to tasks if no specific path is provided
            pathMatch: 'full',
        },
      {
        path: 'tasks', // <your-domain>/users/<userId>/tasks
        component: TasksComponent,
      },
      {
        path: 'tasks/new', // <your-domain>/users/<userId>/tasks/new
        component: NewTaskComponent,
      },
    ],
  },
  {
    path:'**', // <your-domain>/anything-else
    component: NotFoundComponent, // This component should be created to handle 404 errors
  }
];
