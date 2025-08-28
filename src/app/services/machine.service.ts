import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Machine } from '../models/Machine';
import { Observable, BehaviorSubject } from 'rxjs';
import { Location } from '../models/Location';
import { MachineByIdDTO } from '../models/MachineByIdDTO';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private http: HttpClient) { }
  private BaseURL: string = 'http://localhost:8080';
  // private BaseURL: string = '/api'; //relative URL for deplyement (served from backend)


  getAllMachines(): Observable<Machine[]> {   //for developement only , not for production !!!
    return this.http.get<Machine[]>(this.BaseURL + "/parc");
  }

  getMachineListByLocation(location: Location): Observable<Machine[]> { //keeps the location selected updated
    if (location.id === -1) {
      return this.http.get<Machine[]>(`${this.BaseURL}/parc`);
    } else {
      return this.http.get<Machine[]>(this.BaseURL + '/listMachine',
        { params: { locationId: location.id } }
      );
    }
  }

  createMachine(machine: Machine): Observable<Machine> {
    return this.http.post<Machine>(`${this.BaseURL}/machine`, machine);
  }

  getMachineById(id: string): Observable<MachineByIdDTO> {
    return this.http.get<MachineByIdDTO>(`${this.BaseURL}/machine/${id}`);
  }

  updateMachine(id: string, machine: Machine): Observable<Machine> {
    return this.http.patch<Machine>(`${this.BaseURL}/machine/${id}`, machine);
  }

  //Delete a machine
  deleteMachine(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.BaseURL}/machine/${id}`);
  }

  //Recover and restore functions
  getArchivedMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(`${this.BaseURL}/archivedMachines`);
  }

  restoreMachine(id: string): Observable<Machine> {
    return this.http.post<Machine>(`${this.BaseURL}/archivedMachine/${id}/restore`, {});
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

