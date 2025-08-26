import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//ICON IMPORTS-------------------------------------
import {
  LucideAngularModule, LayoutDashboard, Trash2, User, Users, MapPin, Banknote, ReceiptText, StickyNote, Barcode, Pencil, Diamond,
  Plus, X, Check, LayoutList, History, LogOut, Search
  // ,MapPinCheck, UserRoundPlus,  Bell, UsersRound, Timer,

} from 'lucide-angular';
//-------------------------------------------------

//LIST OF PAGES-------------------------------------
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { AuthPageComponent } from './layout/auth-page/auth-page.component';
import { HomePageComponent } from './layout/home-page/home-page.component';
import { MachineSetupPageComponent } from './layout/machine-setup-page/machine-setup-page.component';

//LIST OF OTHER COMPONENTS---------------------------
import { HeaderComponent } from './layout/components/header/header.component';
import { SideBarComponent } from './layout/components/side-bar/side-bar.component';
import { SideButtonComponent } from './layout/components/side-button/side-button.component';
import { ProfileCardComponent } from './layout/components/profile-card/profile-card.component';
import { MachineListComponent } from './layout/components/machine-list/machine-list.component';
import { MachineCardComponent } from './layout/components/machine-list/machine-card/machine-card.component';
import { HistoryDialogComponent } from './layout/components/history-dialog/history-dialog.component';

//Angular Material components
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AuthPageComponent,
    HomePageComponent,
    HeaderComponent,
    SideBarComponent,
    SideButtonComponent,
    ProfileCardComponent,
    MachineListComponent,
    MachineCardComponent,
    HistoryDialogComponent,
    MachineSetupPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LucideAngularModule.pick({ // Lucide icons
      LayoutDashboard, LayoutList, MapPin,
      LogOut, Search, Pencil, Trash2, Diamond, History,
      Users, User, StickyNote, Barcode, Banknote, ReceiptText, Plus, X, Check
      // ,MapPinCheck,UserRoundPlus,Bell,UsersRound,Timer,
    }),
    BrowserAnimationsModule, // Angular Material animations
    MatDialogModule, // Angular Material Dialog box
    MatSnackBarModule // Angular Material SnackBar
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' } // Set the Angular locale language to French (for date formatting, etc.)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
