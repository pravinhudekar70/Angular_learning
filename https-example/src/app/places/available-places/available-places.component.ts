import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<{places:Place[]}>('http://localhost:3000/places')
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
  onSelectPlace(selectedPlace: Place){
    this.httpClient.put('http://localhost:3000/user-places', {
      placeId: selectedPlace.id,
    }).subscribe({
      next: (respData) => {
        console.log(respData);
      },
      error: (error) => {
        console.log(error);
        this.error.set("Something went wrong selecting the place. please try again later.");
      },
      complete: () => {}
    });
  }
}
