import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//ICON IMPORTS-------------------------------------
import {
  LucideAngularModule, LayoutDashboard, LayoutList, MapPin,
  MapPinCheck, UserRoundPlus, LogOut, Search, Bell, Pencil, Trash2, Diamond, Users, UsersRound, Timer, History,
  User, StickyNote, Barcode, Banknote, ReceiptText

} from 'lucide-angular';
//-------------------------------------------------

//LIST OF PAGES-------------------------------------
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { AuthPageComponent } from './layout/auth-page/auth-page.component';
import { HomePageComponent } from './layout/home-page/home-page.component';

//LIST OF OTHER COMPONENTS---------------------------
import { HeaderComponent } from './layout/components/header/header.component';
import { SideBarComponent } from './layout/components/side-bar/side-bar.component';
import { SideButtonComponent } from './layout/components/side-button/side-button.component';
import { ProfileCardComponent } from './layout/components/profile-card/profile-card.component';
import { MachineListComponent } from './layout/components/machine-list/machine-list.component';
import { MachineCardComponent } from './layout/components/machine-list/machine-card/machine-card.component';


//Angular Material components
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistoryDialogComponent } from './layout/components/history-dialog/history-dialog.component';

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
    HistoryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LucideAngularModule.pick({ // Lucide icons
      LayoutDashboard, LayoutList, MapPinCheck, MapPin,
      UserRoundPlus, LogOut, Search, Bell, Pencil, Trash2, Diamond, UsersRound, Timer, History,
      Users, User, StickyNote, Barcode, Banknote, ReceiptText
    }),
    BrowserAnimationsModule, // Angular Material animations
    MatDialogModule // Angular Material Dialog box
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' } // Set the Angular locale language to French (for date formatting, etc.)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
