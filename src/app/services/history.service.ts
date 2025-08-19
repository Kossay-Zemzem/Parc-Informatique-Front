import { Injectable } from '@angular/core';
import { Historique } from '../models/Historique';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(private http: HttpClient) { }
  private BaseURL: string = 'http://localhost:8080';

  // Fetch history logs for a machine
  getHistoryLogs(machineId: number): Observable<Historique[]> {
    return this.http.get<Historique[]>(this.BaseURL + "machine/" + machineId + "/history");
  }

  // Add a new history log
  addHistoryLog(machineId: number, log: Historique): void {
    this.http.post<Historique>(this.BaseURL + "machine/" + machineId + "/history", log).subscribe();
  }

  // Delete a history log
  deleteHistoryLog(machineId: number, logId: number): void {
    this.http.delete<void>(this.BaseURL + "machine/" + machineId + "/history/" + logId).subscribe();
  }
}
