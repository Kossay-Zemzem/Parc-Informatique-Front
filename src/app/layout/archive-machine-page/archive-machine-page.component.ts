import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Machine } from 'src/app/models/Machine';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-archive-machine-page',
  templateUrl: './archive-machine-page.component.html',
  styleUrls: ['./archive-machine-page.component.css']
})
export class ArchiveMachinePageComponent {
  data: Array<Machine> = [
    {
      id: 0,
      type: "unknown", // Laptop, Desktop, Workstation
      marque: "unknown",
      modele: "unknown",
      serviceTag: "unknown",
      reseau: "unknown",
      assignedUser: "unknown",
      locationId: 0,
      locationName: "unknown",
      os: "unknown",
      cpu: "unknown",
      ram: 0,
      typeStockage: "unknown",
      tailleStockage: 0,
      dateAchat: new Date(),
      dateExpirationGarantie: new Date(),
      vendeur: "unknown",
      commentaire: "unknown"
    }
  ]

  private subscription: Subscription = new Subscription(); //subscription pour le comite selectionne

  constructor(private MachineServ: MachineService
  ) { }
  //   private ComiteFilterServ: MembreFilterServiceService) { }

  ngOnInit(): void {
    //Subscribe to loaction changes
    this.subscription = this.MachineServ.getArchivedMachines().subscribe(dataServ => {
      this.data = dataServ;
    });
  }
  UpdateMachineList(machineId: number): void {
    this.data = this.data.filter(machine => machine.id !== machineId);
  }

  ngOnDestroy(): void { //a methode that unsubscribes from the subscription when the component is destroyed to avoid memory leaks
    this.subscription.unsubscribe();
  }

}
