import { Component, Input } from '@angular/core';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  @Input() SidebarItems = [ //link attribute will be removed or reused
    { name: 'TOUS', icon: 'layout-list', link: 'TOUS', activeState: true },
    { name: 'Tunis Office', icon: 'Diamond', link: 'Tunis Office', activeState: false },
    { name: "Sfax", icon: 'Diamond', link: 'Sfax', activeState: false },
    { name: "CPF-GAB", icon: 'Diamond', link: 'CPF-GAB', activeState: false },
    { name: "Tarfa/Bagel", icon: 'Diamond', link: 'Tarfa/Bagel', activeState: false },
    // { name: 'Log out', icon: 'log-out', link: '/home', activeState: false },
    { name: '..................', icon: 'Diamond', link: '..................', activeState: false },
  ];
  constructor(private machineServ: MachineService) {
  }



  onSideButtonClick(i: number) {
    this.SidebarItems.forEach((item, index) => {
      item.activeState = i == index
      if (i == index) {
        item.activeState = true;
      } else {
        item.activeState = false;
      }

    });
    const selectedLocation = this.SidebarItems[i].link;
    // Notify the service when the selected location changes
    this.machineServ.setLocation(selectedLocation);
  }
}
