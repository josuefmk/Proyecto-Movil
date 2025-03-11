/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglemapsComponent } from './components/googlemaps/googlemaps.component';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
const routes: Routes = [
  {
    path: '',
    component: GooglemapsComponent
  }
];


@NgModule({
  declarations: [AppComponent, GooglemapsComponent],
  imports: [BrowserModule, 
    HttpClientModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule,
    MatButtonToggleModule,
    IonicStorageModule.forRoot(), 
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SQLite,EmailComposer],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
