import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import { CpviajesComponent } from 'src/app/components/cpviajes/cpviajes.component';
import { CsviajeComponent } from 'src/app/components/csviaje/csviaje.component';
import { CmviajesComponent } from 'src/app/components/cmviajes/cmviajes.component';
import { MainComponent } from 'src/app/components/main/main.component';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatTabsModule,
    SharedDirectivesModule
  ],
  declarations: [HomePage, MainComponent, CpviajesComponent, CsviajeComponent,CmviajesComponent]
})
export class HomePageModule {}
