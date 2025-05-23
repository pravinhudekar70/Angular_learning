import { Component } from '@angular/core';
import { DUMMY_USERS } from './dummy-users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  title = 'my_app';
  users = DUMMY_USERS;
  selectedUserId? :string ;

  get selectedUser() {
    return this.users.find(user => user.id === this.selectedUserId);
  }

  onSelectUser(id:string) {
   this.selectedUserId =id;
   console.log('Selected user:', this.selectedUser);
  }
  

}
