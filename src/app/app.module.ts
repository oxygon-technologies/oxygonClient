import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/angular-material.module';
import { NavigationComponent } from './util/navigation/navigation.component';
import { NavBarComponent } from './util/nav-bar/nav-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './base/components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './base/components/home/home.component';
import { UserRegistrationComponent } from './base/components/user-registration/user-registration.component';
import { DataTableComponent} from './util/data-table/data-table.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { LovModalComponent } from './util/lov-modal/lov-modal.component';
import { AlertModalComponent } from './util/alert-modal/alert-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NavBarComponent,
    LoginComponent,
    HomeComponent,
    UserRegistrationComponent,
    DataTableComponent,
    LovModalComponent,
    AlertModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule
  ],
  entryComponents: [LovModalComponent,AlertModalComponent],
  providers: [NgbModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
