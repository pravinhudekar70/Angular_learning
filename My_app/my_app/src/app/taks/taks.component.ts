import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-taks',
  imports: [],
  templateUrl: './taks.component.html',
  styleUrl: './taks.component.css'
})
export class TaksComponent {
@Input() name: string | undefined;
}
