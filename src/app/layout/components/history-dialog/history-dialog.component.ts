import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Historique } from 'src/app/models/Historique';
import { HistoryService } from 'src/app/services/history.service';
@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.css']
})
export class HistoryDialogComponent {
  testEntry: Historique = {
    date: new Date(),
    Description: ''
  };
  history: any[] = [];
  newDate: string = '';
  newDescription: string = '';
  constructor(
    /*     public dialogRef: MatDialogRef<HistoryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any */
    public dialogRef: MatDialogRef<HistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { machineId: number },
    private historyService: HistoryService
  ) { }

  ngOnInit(): void {
    this.loadHistory();
    /*     this.historyService.addHistoryLog(this.data.machineId, testEntry).subscribe(() => {
          this.loadHistory();
          this.newDate = '';
          this.newDescription = '';
        }); */

  }

  loadHistory() {
    this.historyService.getHistoryLogs(this.data.machineId).subscribe(res => {
      this.history = res;
    });
  }

  addEntry() {
    if (!this.newDate || !this.newDescription) return;

    const entry = { date: this.newDate, description: this.newDescription };
    this.historyService.addHistoryLog(this.data.machineId, entry).subscribe(() => {
      this.loadHistory();
      this.newDate = '';
      this.newDescription = '';
    });
  }


  /*   deleteEntry(entryId: number) {
      this.historyService.deleteHistoryLog(entryId).subscribe(() => {
        this.loadHistory();
      });
    } */

  onClose() {
    this.dialogRef.close();
  }
}
