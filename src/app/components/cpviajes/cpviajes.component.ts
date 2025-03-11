/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { LoadingController,ModalController,ToastController } from '@ionic/angular';
import { GooglemapsComponent } from 'src/app/components/googlemaps/googlemaps.component';

import { AuthService } from 'src/app/servicios/auth.service';
import { BdviajesService } from 'src/app/servicios/bdviajes.service';
@Component({
  selector: 'app-cpviajes',
  templateUrl: './cpviajes.component.html',
  styleUrls: ['./cpviajes.component.scss'],
})

export class CpviajesComponent implements OnInit {


  marcaViajes = "";
  patenteViajes = "";
  precioViajes = "";
  horaViajes = "";
  capacidadViajes = "";
  ubicacionViajes= "";

  constructor(private router: Router, public toastController: ToastController,private loadingCtrl: LoadingController,private activeroute: ActivatedRoute,private dbservice: BdviajesService, private modalController: ModalController,private authService: AuthService,private emailComposer: EmailComposer) {  
 
    this.activeroute.queryParams.subscribe(params => {
    if(this.router.getCurrentNavigation().extras.state) {
      this.precioViajes=this.router.getCurrentNavigation().extras.state.precioViajes;
      this.ubicacionViajes=this.router.getCurrentNavigation().extras.state.ubicacionViajes;
      
    }
  });

  }

  ngOnInit() {
  

  }
  guardarviaje() {
    this.dbservice.addViajes(this.marcaViajes,this.patenteViajes,this.precioViajes,this.horaViajes,this.capacidadViajes,this.ubicacionViajes);
    this.dbservice.presentToast("Viaje Programado!");
    this.router.navigate(['home/main']);

  }

  async addDirection() {
   this.router.navigate(['home/googlemaps']);
 }

 }


