import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Machine } from '../models/Machine';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private http: HttpClient) { }
  private BaseURL: string = 'http://localhost:8080';
  // private BaseURL: string = ''; // relative URL

  private locationSubject = new BehaviorSubject<string>("TOUS");
  selectedLocation$ = this.locationSubject.asObservable();

  setLocation(location: string) {
    this.locationSubject.next(location); // Update the selected location which will trigger the subscribers
  }

  getAllMachines(): Observable<Machine[]> {   //for developement only , not for production !!!
    return this.http.get<Machine[]>(this.BaseURL + "/parc");
  }
  /*   getMachineListByLocation(location: string): Observable<Machine[]> {
      return this.http.get<Machine[]>(this.BaseURL + '/listMachine',
        { params: { emplacement: location } }
      );
    } */

  getMachineListByLocation(location: string): Observable<Machine[]> { //keeps the location selected updated
    if (location === "TOUS") {
      return this.http.get<Machine[]>(`${this.BaseURL}/parc`);
    } else {
      return this.http.get<Machine[]>(this.BaseURL + '/listMachine',
        { params: { emplacement: location } }
      );
    }
  }

  /*     return [
        {
          id: 1,
          marque: "DELL",
          type: "Laptop",
          modele: "Latitude 5450",
          serviceTag: "8H3R3M3",
          reseau: "TUNL2508",
          emplacement: "Tunis Office",
          assignedUser: "Mohamed Fouleni",
          os: "Windows 10 Pro",
          cpu: "Intel i5-1135G7",
          ram: 16,
          typeStockage: "SSD",
          tailleStockage: 512,
          dateAchat: new Date("2023-01-15"),
          dateExpirationGarantie: new Date("2026-01-15"),
          vendeur: "Dell Store",
          commentaire: "Machine de test pour développement"
        }
      ]; */


}

