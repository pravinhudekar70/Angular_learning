import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placesService.loadAvailablePlaces()
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
        complete: () => {
          this.isFetching.set(false);
        },
        error:(error:Error) => {
          console.log(error);
          this.error.set(error.message);
        }
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  onSelectPlace(selectedPlace: Place){
   const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace).subscribe({
      next: (respData) => {
        console.log(respData);
      },
      error: (error) => {
        console.log(error);
        this.error.set("Something went wrong selecting the place. please try again later.");
      },
      complete: () => {
        console.log ('Place added to user places');
      }
    });
     this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      } );  
  }
}
