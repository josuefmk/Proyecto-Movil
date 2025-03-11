import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetcontrasenaPageRoutingModule } from './resetcontrasena-routing.module';

import { ResetcontrasenaPage } from './resetcontrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetcontrasenaPageRoutingModule
  ],
  declarations: [ResetcontrasenaPage]
})
export class ResetcontrasenaPageModule {}
