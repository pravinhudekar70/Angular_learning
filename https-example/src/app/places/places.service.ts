import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong fetching the available places. please try again later.'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching the your favorite places. please try again later.'
    ).pipe(tap({ next: (userPlaces) => this.userPlaces.set(userPlaces) }));
  }

  addPlaceToUserPlaces(place: Place) {
    const prevplaces = this.userPlaces();
    if (!prevplaces.find((p) => p.id === place.id)) {
      this.userPlaces.update((prevplaces) => [...prevplaces, place]);
    }

    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id,
    });
  }

  removeUserPlace(place: Place) {
    this.userPlaces.update((prevplaces) =>
      prevplaces.filter((p) => p.id !== place.id)
    );
    return this.httpClient.delete('http://localhost:3000/user-places/'+place.id)
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((respData) => respData.places),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
