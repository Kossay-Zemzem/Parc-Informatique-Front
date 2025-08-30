import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { Location } from 'src/app/models/Location';
import { LocationService } from 'src/app/services/location.service';
import { MachineService } from 'src/app/services/machine.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { WashingMachineIcon } from 'lucide-angular';

@Component({
  selector: 'app-machine-setup-page',
  templateUrl: './machine-setup-page.component.html',
  styleUrls: ['./machine-setup-page.component.css']
})
export class MachineSetupPageComponent {

  constructor(private route: ActivatedRoute,
    private machineService: MachineService,
    private fb: FormBuilder,
    private locationService: LocationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }
  isEditMode: boolean = false;
  machineId: string | null = null;
  form!: FormGroup;
  locations: Location[] = [];

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.machineId = id;
        this.loadMachine(id);
      } else {
        this.isEditMode = false;
      }
    });

    this.initForm(); // set up form (possibly with empty values)
    this.locationService.fetchLocations();

    // Subscribe to the locations observable to update SidebarItems when locations are fetched
    this.subscription = this.locationService.locations$.subscribe(locations => {
      this.locations = locations;
    });
  }

  loadMachine(id: string): void {
    /*     this.machineService.getMachineById(id).subscribe(machine => {
          const selectedLocation = this.locations.find(loc => loc.id === machine.locationId) || null;
          this.form.patchValue({
            ...machine,
            location: selectedLocation
          });
        }); */
    combineLatest([
      this.locationService.locations$,
      this.machineService.getMachineById(id)
    ]).subscribe(([locations, machine]) => {
      const selectedLocation = locations.find(loc => loc.id === machine.location.id) || null;
      this.form.patchValue({
        ...machine,
        location: selectedLocation
      });
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      type: ['', Validators.required],
      marque: [''],
      modele: [''],
      serviceTag: ['', Validators.required],
      reseau: [''],
      assignedUser: [''],
      os: ['', [Validators.maxLength(60)]],
      cpu: ['', [Validators.maxLength(60)]],
      ram: [8],
      typeStockage: [''],
      tailleStockage: [256],
      dateAchat: [null],
      dateExpirationGarantie: [null],
      vendeur: ['', [Validators.maxLength(30)]],
      commentaire: ['', [Validators.maxLength(500)]], // Enforce max length of 500 characters (database's max character length)
      location: [null, Validators.required]
    });
  }


  onSubmit(): void {
    if (this.form.valid) {
      // Handle form submission (create or update)
      const machineData = this.form.value;
      if (this.isEditMode && this.machineId) {
        // Update logic
        this.machineService.updateMachine(this.machineId, machineData).subscribe(response => {
          if (response) {
            this.snackBar.open('Machine mise à jour avec succès !', 'Fermer', {
              duration: 3000,
              panelClass: ['snackbar-success'] //not working for now
            });
            this.router.navigate(['/']); // Navigate to home
          } else {
            this.snackBar.open('Erreur lors de la mise à jour de la machine.', 'Fermer', {
              duration: 3000,
              panelClass: ['snackbar-error'] //not working for now
            });
          }
        });

      } else {
        //Create logic
        this.machineService.createMachine(machineData).subscribe(response => {
          if (response) {
            this.snackBar.open('Machine créée avec succès !', 'Fermer', {
              duration: 3000,
              panelClass: ['snackbar-success'] //not working for now
            });
            this.router.navigate(['/']); // Navigate to home
          } else {
            this.snackBar.open('Erreur lors de la création de la machine.', 'Fermer', {
              duration: 3000,
              panelClass: ['snackbar-error'] //not working for now
            });
          }
        });
      }
    }
  }
  onCancel(): void {
    this.router.navigate(['/home']); // Navigate to home
  }
}