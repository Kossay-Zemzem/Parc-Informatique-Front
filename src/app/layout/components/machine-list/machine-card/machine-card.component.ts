import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Machine } from 'src/app/models/Machine';

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
  /*
    @Output() deleteMembre: EventEmitter<number> = new EventEmitter<number>();
    @Output() updateMembre: EventEmitter<{ id: number, numero: string }> = new EventEmitter<{ id: number, numero: string }>();
  */
  constructor() {
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
}
