import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';
import { CardComponent } from './shared/card/card.component';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskComponent } from './task/task.component';
import { FormsModule } from '@angular/forms';
import { NewTaskComponent } from './tasks/new-task/new-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardComponent,
    UserComponent,
    TaskComponent,
    NewTaskComponent,
    TasksComponent,
  ],
  imports: [BrowserModule, DatePipe, CommonModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
