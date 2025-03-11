import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpviajesComponent } from 'src/app/components/cpviajes/cpviajes.component';
import { CsviajeComponent } from 'src/app/components/csviaje/csviaje.component';
import { CmviajesComponent } from 'src/app/components/cmviajes/cmviajes.component';
import { MainComponent } from 'src/app/components/main/main.component';
import { HomePage } from './home.page';
import { GooglemapsComponent } from 'src/app/components/googlemaps/googlemaps.component';


const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'main',
        component: MainComponent
      },
      {
        path:'pviajes',
        component: CpviajesComponent
      },
      {
        path:'sviajes',
        component: CsviajeComponent
      },
      {
        path:'mviajes',
        component: CmviajesComponent
      },
      {
        path: 'googlemaps',
        component: GooglemapsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
