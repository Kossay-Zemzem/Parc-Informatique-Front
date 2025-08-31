import { Component, Input } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { MachineService } from 'src/app/services/machine.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  /*
  @Input() SidebarItems = [ //link attribute will be removed or reused
    { name: 'TOUS', icon: 'layout-list', link: 'TOUS', activeState: true },
    { name: 'Tunis Office', icon: 'Diamond', link: 'Tunis Office', activeState: false },
    { name: "Sfax", icon: 'Diamond', link: 'Sfax', activeState: false },
    { name: "CPF-GAB", icon: 'Diamond', link: 'CPF-GAB', activeState: false },
    { name: "Tarfa/Bagel", icon: 'Diamond', link: 'Tarfa/Bagel', activeState: false },
    // { name: 'Log out', icon: 'log-out', link: '/home', activeState: false },
    { name: '..................', icon: 'Diamond', link: '..................', activeState: false },
    { name: '..................', icon: 'Diamond', link: '..................', activeState: false },
    { name: '..................', icon: 'Diamond', link: '..................', activeState: false },
    { name: '..................', icon: 'Diamond', link: '..................', activeState: false },
    { name: '..................', icon: 'Diamond', link: '..................', activeState: false },
    { name: '..................', icon: 'Diamond', link: '..................', activeState: false },
    { name: '..................', icon: 'Diamond', link: '..................', activeState: false },
    { name: '..................', icon: 'Diamond', link: '..................', activeState: false },
    { name: '..................', icon: 'Diamond', link: '..................', activeState: false },
    { name: '..................', icon: 'Diamond', link: '..................', activeState: false },
    { name: 'test test', icon: 'Diamond', link: '..................', activeState: false }
  ]; */

  //linkId should be the LocationId
  //-1 is reserved for TOUS 
  // 0 is initial value before the IDs are fetched using the service
  SidebarItems = [
    { name: 'TOUS', icon: 'layout-list', linkId: -1, activeState: true },
    // { name: 'Unknown', icon: 'Diamond', linkId: 0, activeState: false },
  ]

  showAddLocationInput = false;
  newLocationName = '';

  editMode = false;
  editLocationNames: { [key: number]: string } = {};

  isSideBarActive: boolean = true;

  deleteMode = false;
  showDeleteModal = false;
  locationToDelete: any = null;

  private subscription: Subscription = new Subscription();
  private routerSub!: Subscription;

  constructor(private router: Router, private locationServ: LocationService) {
  }

  ngOnInit() {
    // Fetch locations from the service when the component initializes
    this.locationServ.fetchLocations();

    // Subscribe to the locations observable to update SidebarItems when locations are fetched
    this.subscription = this.locationServ.locations$.subscribe(locations => {
      //Always start with TOUS
      this.SidebarItems = [
        { name: 'TOUS', icon: 'layout-list', linkId: -1, activeState: true }
      ];
      // Find the location you want to insert second (e.g., SPARE)
      const spareLocation = locations.find(loc => loc.name.toLowerCase() === 'spare');
      if (spareLocation) {
        this.SidebarItems.push({ name: spareLocation.name, icon: 'package-open', linkId: spareLocation.id, activeState: false });
      }

      // Add the rest, excluding the one already added
      locations
        .filter(loc => loc.name.toLowerCase() !== 'spare')
        .forEach(location => {
          this.SidebarItems.push({ name: location.name, icon: 'Diamond', linkId: location.id, activeState: false });
        });
    });
    console.log("Sidebar items are:", this.SidebarItems);

    /// Listen to router events for route changes to disable sidebar
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSideBarState(event.urlAfterRedirects);
      }
    });

    // Initial check
    this.updateSideBarState(this.router.url);
  }

  //Track sidebar state 
  private updateSideBarState(url: string) {
    this.isSideBarActive = url === '/home';
  }

  onLogoClick() {
    this.router.navigate(['/home']);
  }

  onSideButtonClick(selectedItem: any) {
    if (!this.isSideBarActive) return; // Prevent action if in edit mode or buttons are disabled
    this.SidebarItems.forEach(item => {
      item.activeState = item === selectedItem;
    });
    //create a Location object to pass to the service
    const selectedLocation = {
      id: selectedItem.linkId,
      name: selectedItem.name
    };
    this.locationServ.setLocation(selectedLocation);
  }
  //Adding location-----------------------------------------------------
  onAddLocationIconClick() {
    if (!this.isSideBarActive) return; // Prevent action if in edit mode or buttons are disabled
    this.showAddLocationInput = true;
    setTimeout(() => {
      const input = document.getElementById('add-location-input');
      if (input) input.focus();
    }, 0);
  }

  onAddLocationInputKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.newLocationName.trim()) {
      this.addLocation(this.newLocationName.trim());
      this.showAddLocationInput = false;
      this.newLocationName = '';
    } else if (event.key === 'Escape') {
      this.showAddLocationInput = false;
      this.newLocationName = '';
    }
  }

  addLocation(locationName: String) {
    this.locationServ.addLocation(locationName).subscribe();
  }

  onAddLocationConfirmClick() {
    if (this.newLocationName.trim()) {
      this.addLocation(this.newLocationName.trim());
      this.showAddLocationInput = false;
      this.newLocationName = '';
    }
  }

  onAddLocationCancelClick() {
    this.showAddLocationInput = false;
    this.newLocationName = '';
  }
  //Editing location-----------------------------------------------------
  onEditModeClick() {
    if (!this.isSideBarActive) return; // Prevent action if in edit mode or buttons are disabled
    this.editMode = true;
    setTimeout(() => {
      const input = document.querySelector('input[type="text"][ng-reflect-model]');
      if (input) (input as HTMLInputElement).focus();
    }, 0);
    this.SidebarItems.forEach(item => {
      if (item.linkId !== -1 && item.name.toLowerCase() !== 'spare') {
        this.editLocationNames[item.linkId] = item.name;
      }
    });
  }

  onEditConfirmClick() {
    Object.keys(this.editLocationNames).forEach(id => {
      const newName = this.editLocationNames[+id];
      const item = this.SidebarItems.find(i => i.linkId === +id);
      if (item && item.name !== newName && newName.trim()) {
        this.locationServ.editLocation(+id, newName.trim()).subscribe();
      }
    });
    this.editMode = false;
  }

  onEditCancelClick() {
    this.editMode = false;
    this.editLocationNames = {};
  }


  onEditLocationInputKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.editMode = false;
    }
  }
  //Delete location --------------------------------------
  onDeleteModeClick() {
    if (!this.isSideBarActive) return;
    this.deleteMode = true;
  }

  onDeleteCancelClick() {
    this.deleteMode = false;
    this.locationToDelete = null;
    this.showDeleteModal = false;
  }

  onDeleteIconClick(item: any) {
    this.locationToDelete = item;
    this.showDeleteModal = true;
  }

  confirmDeleteLocation() {
    if (this.locationToDelete) {
      this.locationServ.deleteLocation(this.locationToDelete.linkId).subscribe(() => {
        this.showDeleteModal = false;
        this.deleteMode = false;
        this.locationToDelete = null;
      });
    }
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.locationToDelete = null;
  }

  // unsubscribe from all subscriptions
  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.routerSub) this.routerSub.unsubscribe();
  }
}
