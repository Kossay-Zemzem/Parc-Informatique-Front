import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() title: string = 'TITLE';
  isEditMode: boolean = false;
  isSubTitle: boolean = false;

  // private locationSub!: Subscription;
  private routerSub!: Subscription;


  constructor(private locationService: LocationService, private router: Router) { }

  ngOnInit() {
    this.locationService.selectedLocation$.subscribe(location => {
      // Update the header title based on the selected location
      if (location.name === 'TOUS' || location.id === -1) {
        this.title = 'Parc entiére';
      } else {
        this.title = location.name;
      }
    });
    /// Listen to router events for route changes
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSubTitle(event.urlAfterRedirects);
      }
    });

    // Initial check
    this.updateSubTitle(this.router.url);
  }

  ngOnDestroy() {
    if (this.routerSub) this.routerSub.unsubscribe();
  }

  private updateSubTitle(url: string) {
    this.isSubTitle = url === '/machine/new' || url.startsWith('/machine/edit/');
    this.isEditMode = url.startsWith('/machine/edit/');
  }

}
