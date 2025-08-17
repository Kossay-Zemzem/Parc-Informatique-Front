import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.css']
})
export class HistoryDialogComponent {
  newEntry = '';

  constructor(
    public dialogRef: MatDialogRef<HistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // You can make the API call here to fetch data if needed
    // Example using a service (inject the service in the constructor):
    // this.myService.getHistory(data.id).subscribe(history => {
    //   this.data.history = history;
    // });
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close(this.newEntry);
  }
}
