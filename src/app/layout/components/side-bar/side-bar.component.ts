import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  @Input() SidebarItems = [
    { name: 'TOUS', icon: 'layout-list', link: '/home', activeState: true },
    { name: 'Tunis Office', icon: 'Diamond', link: '/home', activeState: false },
    { name: "Sfax", icon: 'Diamond', link: '/home', activeState: false },
    { name: "CPF-GAB", icon: 'Diamond', link: '/home', activeState: false },
    { name: "Tarfa/Bagel", icon: 'Diamond', link: '/home', activeState: false },
    // { name: 'Log out', icon: 'log-out', link: '/home', activeState: false },
    { name: '..................', icon: 'Diamond', link: '/home', activeState: false },
  ];
  constructor() { }

  onSideButtonClick(i: number) {
    this.SidebarItems.forEach((item, index) => {
      item.activeState = i == index
      /*       if(i==index){
              item.activeState = true;
            }else{
              item.activeState = false;
            } */

    });
  }
}
