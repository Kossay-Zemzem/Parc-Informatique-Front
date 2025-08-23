import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { HomePageComponent } from './layout/home-page/home-page.component';
import { AuthPageComponent } from './layout/auth-page/auth-page.component';
import { MachineSetupPageComponent } from './layout/machine-setup-page/machine-setup-page.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "auth", component: AuthPageComponent },
  { path: "home", component: HomePageComponent },
  {
    path: 'machine/new',          // for creating a machine
    component: MachineSetupPageComponent
  },
  {
    path: 'machine/edit/:id',     // for editing a machine
    component: MachineSetupPageComponent
  },
  { path: "**", component: PageNotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//exporting the list of pages instead of each page separately
export const listPages = [PageNotFoundComponent, AuthPageComponent, HomePageComponent, MachineSetupPageComponent];