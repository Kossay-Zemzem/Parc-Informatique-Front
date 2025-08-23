import { Component, Input } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() title: string = 'TITLE';
  isEditMode: boolean = false;

  ngOnInit() {
    this.locationService.selectedLocation$.subscribe(location => {
      // Update the header title based on the selected location
      if (location.name === 'TOUS' || location.id === -1) {
        this.title = 'Parc entiére';
      } else {
        this.title = location.name;
      }
    });
  }
  constructor(private locationService: LocationService) { }
}
