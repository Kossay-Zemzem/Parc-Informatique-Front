import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Machine } from 'src/app/models/Machine';
import { MatDialog } from '@angular/material/dialog';
import { HistoryDialogComponent } from '../../history-dialog/history-dialog.component';
import { Router } from '@angular/router';
import { MachineService } from 'src/app/services/machine.service';
@Component({
  selector: 'app-machine-card',
  templateUrl: './machine-card.component.html',
  styleUrls: ['./machine-card.component.css']
})
export class MachineCardComponent {
  @Input() machine: Machine = {
    id: 0,
    type: "unknown", // Laptop, Desktop, Workstation
    marque: "unknown",
    modele: "unknown",
    serviceTag: "unknown",
    reseau: "unknown",
    locationId: 0,
    locationName: "unknown",
    assignedUser: "unknown",
    os: "unknown",
    cpu: "unknown",
    ram: 0,
    typeStockage: "unknown",
    tailleStockage: 0,
    dateAchat: new Date(),
    dateExpirationGarantie: new Date(),
    vendeur: "unknown",
    commentaire: "unknown"
  };

  textStyleTcss: string = "font-poppins font-normal text-md";
  isEditing: boolean = false;
  showCommentModal: boolean = false;
  selectedCommentaire: string = '';

  @Output() machineDeleted: EventEmitter<number> = new EventEmitter<number>();
  constructor(private dialog: MatDialog,
    private router: Router,
    private machineService: MachineService
  ) {
  }
  ngOnInit(): void {
    // console.log("MachineCardComponent initialized with machine:", this.machine);
  }
  /*   ngOnChanges(changes: SimpleChanges): void { //methode qui permet de detecter les changements des donnees des membres
      if (changes['machine']) {
        this.machine = changes['machine'].currentValue;
      }
    } */
  editMachine(machine: Machine): void {
    if (machine.id != 0) {
      this.router.navigate(['/machine/edit/', machine.id]);
    }
  }
  deleteMachine(machineId: number): void {
    if (machineId != 0) {
      this.machineService.deleteMachine(machineId.toString()).subscribe((result: boolean) => {
        if (result) {
          this.machineDeleted.emit(machineId);
        } else {
          console.error("Failed to delete machine with ID:", machineId);
          // Handle deletion failure (e.g., show a notification)
        }
      });
    }
  }

  openDialogue(id: number): void {
    const dialogRef = this.dialog.open(HistoryDialogComponent, {
      data: { machineId: id, viewOnly: false },
      panelClass: 'rounded-2xl',
      width: '60vw', // Keep responsive width
      maxWidth: '90vw', // Allow up to 90% of viewport width for larger screens
      minWidth: '700px', // Minimum width for small screens
      maxHeight: '80vh', // Maximum height for larger screens
      minHeight: '500px' // Minimum height for small screens
      // You can also set height if needed, e.g. height: '70vh'
    });

    /*     dialogRef.afterClosed().subscribe(result => {
          if (result) {
            item.history.push(result);
          }
        }); */
  }

  openCommentModal(comment: string): void {
    this.selectedCommentaire = comment;
    this.showCommentModal = true;
  }

  closeCommentModal(): void {
    this.showCommentModal = false;
    this.selectedCommentaire = '';
  }
}
