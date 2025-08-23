import { Component, Input } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { MachineService } from 'src/app/services/machine.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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

  private subscription: Subscription = new Subscription();
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
      // Add fetched locations to SidebarItems
      locations.forEach(location => {
        this.SidebarItems.push({ name: location.name, icon: 'Diamond', linkId: location.id, activeState: false });
      });
    });
    console.log("Sidebar items are:", this.SidebarItems);
  }

  onLogoClick() {
    this.router.navigate(['/home']);
  }

  onSideButtonClick(selectedItem: any) {
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
  //Editing location-----------------------------------------------------
  onEditModeClick() {
    this.editMode = true;
    this.SidebarItems.forEach(item => {
      if (item.linkId !== -1) {
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

  // unsubscribe from all subscriptions
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
