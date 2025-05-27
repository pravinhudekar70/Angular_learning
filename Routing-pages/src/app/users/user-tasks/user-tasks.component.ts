import { Component, computed, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {
userName='';
  //userId = input.required<string>();
  private usersService = inject(UsersService);
  private activatedROute = inject(ActivatedRoute);
 // userName = computed(() => this.usersService.users.find((u) => u.id === this.userId())?.name)

  ngOnInit() {
   console.log(this.activatedROute)
  this.activatedROute.paramMap.subscribe({
    next: (paramMap) => {
      this.userName = this.usersService.users.find((u) => u.id === paramMap.get('userId'))?.name || '';
    }
  });
  }
}
