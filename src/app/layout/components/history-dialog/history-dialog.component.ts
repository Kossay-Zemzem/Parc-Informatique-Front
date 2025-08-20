import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Historique } from 'src/app/models/Historique';
import { HistoriqueCreateDTO } from 'src/app/models/HistoriqueCreateDTO';
import { HistoryService } from 'src/app/services/history.service';
@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.css']
})
export class HistoryDialogComponent {
  history: Historique[] = [];
  newDate: Date = new Date();
  newDescription: string = '';
  constructor(
    public dialogRef: MatDialogRef<HistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { machineId: number },
    private historyService: HistoryService
  ) { }

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory() {
    this.historyService.getHistoryLogs(this.data.machineId).subscribe(res => {
      this.history = res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());;
    });
    console.log("history:", this.history);
  }

  addEntry() {
    if (!this.newDate || !this.newDescription) return;

    const entry: HistoriqueCreateDTO = { date: this.newDate, description: this.newDescription };
    this.historyService.addHistoryLog(this.data.machineId, entry).subscribe((createdEntry: Historique) => {
      this.history.push(createdEntry); // Add the new entry directly and 
      this.history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); //This is evidently temporary work around, sorting in the backend would be the optimal route (there are time consrtaints for now)

      // this.loadHistory(); // Uncomment if you want to reload the entire history
      this.newDate = new Date();
      this.newDescription = '';
    });
  }


  deleteEntry(entryId: number) {
    this.historyService.deleteHistoryLog(this.data.machineId, entryId).subscribe(() => {
      this.loadHistory();
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
