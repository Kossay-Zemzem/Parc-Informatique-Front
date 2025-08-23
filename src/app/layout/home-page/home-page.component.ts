import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private router: Router) { }

  onAddMachineClick() {
    //routing to add machine page
    this.router.navigate(['/machine/new']);
    console.log("Navigating to add machine page");
  }
}
