import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from "../shared/card/card.component";



@Component({
  selector: 'app-user',
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input({ required: true }) user!: {
    id: string;
    name: string;
    avatar: string;
  };
  @Input({required:true}) selected!:boolean;

  @Output() select = new EventEmitter();

  get imagePath() {
    return 'users/' + this.user.avatar;
  }
  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
