import { Component } from '@angular/core';
import { Machine } from 'src/app/models/Machine';
import { MachineService } from 'src/app/services/machine.service';
import { Observable, Subscription } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent {
  /*   headerItems: Array<string> = ["Nom", "Numero", "Email", "Status", "Actions"]; */

  // data: Array<Machine> = [
  //   {
  //     id: 0,
  //     type: "unknown", // Laptop, Desktop, Workstation
  //     marque: "unknown",
  //     modele: "unknown",
  //     serviceTag: "unknown",
  //     reseau: "unknown",
  //     assignedUser: "unknown",
  //     locationId: 0,
  //     locationName: "unknown",
  //     os: "unknown",
  //     cpu: "unknown",
  //     ram: 0,
  //     typeStockage: "unknown",
  //     tailleStockage: 0,
  //     dateAchat: new Date(),
  //     dateExpirationGarantie: new Date(),
  //     vendeur: "unknown",
  //     commentaire: "unknown"
  //   }
  // ]
  data: Array<Machine> = [];
  loading: boolean = true;

  private subscription: Subscription = new Subscription(); //subscription pour le comite selectionne

  constructor(private MachineServ: MachineService,
    private LocationServ: LocationService
  ) { }
  //   private ComiteFilterServ: MembreFilterServiceService) { }

  ngOnInit(): void {
    //Subscribe to loaction changes
    this.subscription = this.LocationServ.selectedLocation$.subscribe(location => {
      this.MachineServ.getMachineListByLocation(location).subscribe(dataServ => {
        this.data = dataServ; // Update the data with the machines for the selected location
        this.loading = false; // Stop loading
        const listDiv = document.getElementById('machine-list');
        if (listDiv) listDiv.scrollTop = 0;
      });
    });
  }

  UpdateMachineList(machineId: number): void {
    //remove the deleted machine
    this.data = this.data.filter(machine => machine.id !== machineId);
  }

  ngOnDestroy(): void { //a methode that unsubscribes from the subscription when the component is destroyed to avoid memory leaks
    this.subscription.unsubscribe();
  }
}
