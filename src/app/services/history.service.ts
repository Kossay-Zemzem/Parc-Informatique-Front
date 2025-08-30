import { Injectable } from '@angular/core';
import { Historique } from '../models/Historique';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoriqueCreateDTO } from '../models/HistoriqueCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(private http: HttpClient) { }
  // private BaseURL: string = 'http://localhost:8080';
  private BaseURL: string = ''; //relative URL for deplyement (served from backend)

  // Fetch history logs for a machine
  getHistoryLogs(machineId: number): Observable<Historique[]> {
    return this.http.get<Historique[]>(this.BaseURL + "/machine/" + machineId + "/history");
  }
  getArchivedHistoryLogs(machineId: number): Observable<Historique[]> {
    return this.http.get<Historique[]>(this.BaseURL + "/archivedMachine/" + machineId + "/history");
  }

  // Add a new history log
  addHistoryLog(machineId: number, log: HistoriqueCreateDTO): Observable<Historique> {
    return this.http.post<Historique>(this.BaseURL + "/machine/" + machineId + "/history", log);
  }

  // Delete a history log
  deleteHistoryLog(machineId: number, logId: number): Observable<void> {
    return this.http.delete<void>(this.BaseURL + "/machine/" + machineId + "/history/" + logId);
  }
}
