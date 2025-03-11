import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetcontrasenaPage } from './resetcontrasena.page';

const routes: Routes = [
  {
    path: '',
    component: ResetcontrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetcontrasenaPageRoutingModule {}
