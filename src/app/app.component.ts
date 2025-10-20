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
  titles: { [key: string]: { title: string; leftOffset: string; topOffset: string; yellowBoxWidth: string } } = {};
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
  }
}
