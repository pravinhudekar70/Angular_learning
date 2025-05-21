import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { HttpClient } from '@angular/common/http';
import { Place } from '../place.model';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  private httpClient = inject(HttpClient);
isFetching = signal(false);
  error = signal<string | null>(null);
    private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
      this.isFetching.set(true);
      const subscription = this.httpClient
        .get<{places:Place[]}>('http://localhost:3000/user-places')
        .subscribe({
          next: (respData) => {
            this.places.set(respData.places);
          },
          complete: () => {
            this.isFetching.set(false);
          },
          error:(error) => {
            console.log(error);
            this.error.set("Something went wrong fetching the places. please try again later.");
          }
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
}
