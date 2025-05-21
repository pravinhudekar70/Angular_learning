import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  private placesService = inject(PlacesService);
  places = this.placesService.loadedUserPlaces;
  isFetching = signal(false);
  error = signal<string | null>(null);
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placesService.loadUserPlaces().subscribe({
     
      complete: () => {
        this.isFetching.set(false);
      },
      error: (error: Error) => {
        console.log(error);
        this.error.set(error.message);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
