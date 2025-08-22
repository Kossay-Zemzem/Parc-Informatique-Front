import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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



}
