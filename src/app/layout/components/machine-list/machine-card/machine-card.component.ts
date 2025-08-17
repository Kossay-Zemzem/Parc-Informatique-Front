import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Machine } from 'src/app/models/Machine';
import { MatDialog } from '@angular/material/dialog';
import { HistoryDialogComponent } from '../../history-dialog/history-dialog.component';
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
    emplacement: "unknown",
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
  //tempo-----------------
  items = [
    { name: 'Machine A', history: ['Checked 2023', 'Updated 2024'] },
    { name: 'Machine B', history: ['Installed 2022'] }
  ];
  //----------------------------------
  constructor(private dialog: MatDialog) {
  }
  ngOnInit(): void {
    // console.log("MachineCardComponent initialized with machine:", this.machine);
  }
  ngOnChanges(changes: SimpleChanges): void { //methode qui permet de detecter les changements des donnees des membres
    if (changes['machine']) {
      this.machine = changes['machine'].currentValue;
    }
  }

  supprimerMembre(): void {
    console.log("Suppression du membre avec l'ID: ");
  }

  modifierMembre(): void {
    this.isEditing = !this.isEditing;
  }

  saveNumero(): void {
    // console.log(`Updated numero: ${this.numero}`);
  }
  openDialogue(item: any): void {
    const dialogRef = this.dialog.open(HistoryDialogComponent, {
      data: { item },
      panelClass: 'rounded-2xl' // optional: Tailwind class for rounded dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        item.history.push(result);
      }
    });
  }
}
