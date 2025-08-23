import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Location } from '../models/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private BaseURL = 'http://localhost:8080';

  // Holds the currently selected location
  private selectedLocationSubject = new BehaviorSubject<Location>({ id: -1, name: "TOUS" });
  selectedLocation$ = this.selectedLocationSubject.asObservable();

  // Holds the list of available locations
  private locationsSubject = new BehaviorSubject<Location[]>([]);
  locations$ = this.locationsSubject.asObservable();

  constructor(private http: HttpClient) { }

  setLocation(location: Location) {
    this.selectedLocationSubject.next(location); // Update the selected location which will trigger the subscribers
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.BaseURL}/locations`);
  }

  fetchLocations() {
    this.getLocations().subscribe(locations => {
      this.locationsSubject.next(locations);
    });
  }

  addLocation(locationName: String): Observable<Location> {
    return this.http.post<Location>(`${this.BaseURL}/locations`, locationName).pipe(
      tap({
        next: (newLocation: Location) => {
          const currentLocations = this.locationsSubject.value;
          this.locationsSubject.next([...currentLocations, newLocation]); //spread (...) that list into a new array, and add the newLocation to the end
        }
      })
    );
  }

  editLocation(id: number, newName: string) {
    // Send the new name as a raw string, not as an object
    return this.http.post(`${this.BaseURL}/locations/${id}/update`, newName).pipe(
      tap({
        next: () => {
          const current = this.locationsSubject.value;
          const updated = current.map(loc =>
            loc.id === id ? { ...loc, name: newName } : loc
          );
          this.locationsSubject.next(updated);
        }
      })
    );
  }
}
