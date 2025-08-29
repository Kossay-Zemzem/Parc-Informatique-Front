import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExportParams } from '../models/ExportParams';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  //unused
  constructor(private http: HttpClient) { }
  private BaseURL: string = 'http://localhost:8080';

  exportData(params: ExportParams) {
    let url = '';

    if (params.dataType === 'history') {
      url = `/export/history/${params.format}`;
      if (params.format === 'pdf' && params.pageSize) {
        url += `?pageSize=${params.pageSize}`;
      }
    } else {
      url = `/export/machine/${params.format}`;
      const queryParams: string[] = [];

      if (params.locationId) queryParams.push(`locationId=${params.locationId}`);
      if (params.format === 'pdf' && params.pageSize) queryParams.push(`pageSize=${params.pageSize}`);

      if (queryParams.length) url += `?${queryParams.join('&')}`;
    }

    return this.http.get(this.BaseURL + url, {
      responseType: 'blob',
      observe: 'response'
    });
  }
}

