import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExportParams } from 'src/app/models/ExportParams';
import { Location } from 'src/app/models/Location';
import { ExportService } from 'src/app/services/export.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-export-wizard-dialog',
  templateUrl: './export-wizard-dialog.component.html',
  styleUrls: ['./export-wizard-dialog.component.css']
})
export class ExportWizardDialogComponent implements OnInit {
  dataType: 'machine' | 'history' = 'machine';
  format: 'csv' | 'excel' | 'pdf' | null = null;
  pageSize: 'A4' | 'A3' = 'A4';
  locationId: number | null = null;

  locations: Location[] = [];

  constructor(
    public dialogRef: MatDialogRef<ExportWizardDialogComponent>,
    private http: HttpClient,
    private locationService: LocationService,
    private exportService: ExportService
  ) { }

  ngOnInit(): void {
    // fetch locations from dedicated service
    // replace with your LocationService
    this.locationService.getLocations().subscribe((data) => {
      this.locations = data;
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onExport() {

    let url = '';
    // const baseURL = 'http://localhost:8080';
    const baseURL: string = ''; //relative URL for deplyement (served from backend)

    if (this.dataType === 'history') {
      url = `/export/history/${this.format}`;
      if (this.format === 'pdf') {
        url += `?pageSize=${this.pageSize}`;
      }
    } else {
      url = `/export/machine/${this.format}`;
      const params: string[] = [];

      if (this.locationId) params.push(`locationId=${this.locationId}`);
      if (this.format === 'pdf') params.push(`pageSize=${this.pageSize}`);

      if (params.length) url += `?${params.join('&')}`;
    }


    this.http.get(baseURL + url, {
      responseType: 'blob',
      observe: 'response' // This gives us access to headers
    }).subscribe((response) => {
      const blob = response.body;

      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `export.${this.format}`; // fallback filename

      if (contentDisposition) {
        const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }

      if (blob) {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = filename; // Use the filename from backend
        a.click();
        URL.revokeObjectURL(objectUrl);

        this.dialogRef.close(true);
      } else {
        // Optionally handle error case here
        this.dialogRef.close(false);
      }
    });
  }

  /*   onExport() {
      const exportParams: ExportParams = {
        dataType: this.dataType,
        format: this.format ?? '', // fallback to empty string if null
        locationId: this.locationId ?? 0, // fallback to 0 if null
        pageSize: this.pageSize === 'A4' ? 4 : 3 // convert 'A4'/'A3' to number
      };
  
      this.exportService.exportData(exportParams).subscribe({
        next: () => {
          console.log('Export completed successfully');
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Export failed:', error);
          // Handle error (show toast, etc.)
        }
      });
    } */
}
