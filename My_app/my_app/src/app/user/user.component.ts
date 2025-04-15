import { Component } from '@angular/core';

import { DUMMY_USERS } from '../dummy-users';

const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
selectedUser = DUMMY_USERS[randomIndex];

get imagePath(){
  return 'users/'+ this.selectedUser.avatar;
}

get userAvatar() {
  return this.selectedUser.avatar;
}
get userName() {
  return this.selectedUser.name;
}
 onSelectUser(){
  console.log('Selected user:', this.selectedUser.name);
  const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
  this.selectedUser = DUMMY_USERS[randomIndex];
 }

}