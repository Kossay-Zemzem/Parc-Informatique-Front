import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //title customization (will have to be reworked from the ground up) 
  title: string = ''; //default title
  leftOffsetTcss: string = "left-[14.7rem]" //offset of the yellow box decoration
  topOffsetTcss: string = "top-[0.6rem]" //offset of the yellow box decoration
  yellowBoxWidthTcss: string = "w-40" //width of the yellow box decoration
  //TODO clean unused title parametres 
  titles: { [key: string]: { title: string; leftOffset: string; topOffset: string; yellowBoxWidth: string } } = {
    '/membres': {
      title: 'Membres de comités',
      leftOffset: 'left-[14.7rem]',
      topOffset: 'top-[0.6rem]',
      yellowBoxWidth: 'w-40'
    },
    '/taches': {
      title: 'Tâches des comités',
      leftOffset: 'left-[13.5rem]',
      topOffset: 'top-[0.6rem]',
      yellowBoxWidth: 'w-32'
    },
    '/demande': {
      title: 'Demande de participation',
      leftOffset: 'left-[15.4rem]',
      topOffset: 'top-[0.8rem]',
      yellowBoxWidth: 'w-60'
    },
    '/tachesComite': {
      title: 'Tâches du comité nom_comite',
      leftOffset: 'left-[12.1rem]',
      topOffset: 'top-[0.5rem]',
      yellowBoxWidth: 'w-36'
    }
  };
  //sidebar customisation-------
  //SidebarItems = [];
  SidebarItems = [
    { name: 'unkown', icon: 'unkown', link: '/unkown', activeState: true },
    { name: 'unkown', icon: 'unkown', link: '/unkown', activeState: false },
    { name: 'unkown', icon: 'unkown', link: '/unkown', activeState: false },
    { name: 'unkown', icon: 'unkown', link: '/unkown', activeState: false },
  ];
  constructor(private router: Router) { }
  // Check if the current route is one that requires the sidebar and header
  showLayout(): boolean {
    const excludedRoutes = ['/auth', '/inscription']; //page routes that don't use header and sidebar
    return !excludedRoutes.includes(this.router.url);
  }
  ngOnInit(): void {
    // Listen for route changes
    /*
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)) // Narrow the type to NavigationEnd
      .subscribe((event: NavigationEnd) => {
        this.updateTitle(event.urlAfterRedirects); // Update the title based on the new route
        this.updateSidebar(event.urlAfterRedirects); // Update the sidebar based on the new route
      }); */
  }
  /*
    private updateTitle(url: string): void {
      this.title = this.titles[url].title || ''; // Default to empty if not found
      this.leftOffsetTcss = this.titles[url].leftOffset;
      this.topOffsetTcss = this.titles[url].topOffset;
      this.yellowBoxWidthTcss = this.titles[url].yellowBoxWidth;
    }
    private updateSidebar(url: string): void {
      const AdminRoutes = ['/demande', '/taches', '/membres']; //temporaire jusqu'a ce qu'on ait le backend et le routng final
      const MembreRoutes = ['/tachesComite']; //temporaire jusqu'a ce qu'on ait le backend et le routng final
  
      // Update sidebar items based on the URL (can be optimized further)
      if (AdminRoutes.includes(this.router.url)) {
        this.SidebarItems = [
          { name: 'List Des Membres', icon: 'layout-dashboard', link: '/membres', activeState: true },
          { name: 'Taches', icon: 'layout-list', link: '/taches', activeState: false },
          { name: "Demandes d'inscription", icon: 'user-round-plus', link: '/demande', activeState: false },
          { name: 'Log out', icon: 'log-out', link: '/', activeState: false },
        ];
      }
      else if (MembreRoutes.includes(this.router.url)) {
        this.SidebarItems = [
          { name: 'Tableau de bord', icon: 'layout-dashboard', link: '/tachesComite', activeState: true },
          { name: 'Mes taches', icon: 'layout-list', link: '/tacheMembreOnly', activeState: false },
          { name: "Membres comité", icon: 'users-round', link: '/listeMembreComite', activeState: false },
          { name: 'Log out', icon: 'log-out', link: '/', activeState: false },
        ];
      } else {
        this.SidebarItems = [
          { name: 'unkown', icon: 'unkown', link: '/unkown', activeState: true },
          { name: 'unkown', icon: 'unkown', link: '/unkown', activeState: false },
          { name: 'unkown', icon: 'unkown', link: '/unkown', activeState: false },
          { name: 'unkown', icon: 'unkown', link: '/unkown', activeState: false },
        ]
      }
      this.SidebarItems.forEach(item => {
        item.activeState = url.includes(item.link);
      });
    }
      */
}
