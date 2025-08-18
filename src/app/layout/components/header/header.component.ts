import { Component, Input } from '@angular/core';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() title: string = 'TITLE';

  ngOnInit() {
    this.machineService.selectedLocation$.subscribe(location => {
      // Update the header title based on the selected location
      if (location === 'TOUS') {
        this.title = 'Parc entiére';
      } else {
        this.title = location;
      }
    });
  }
  constructor(private machineService: MachineService) { }
}
