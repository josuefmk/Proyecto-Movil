/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController} from '@ionic/angular';
import { BdviajesService} from 'src/app/servicios/bdviajes.service';
import { Viajes } from 'src/app/clases/viajes';
import { AuthService } from 'src/app/servicios/auth.service';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { Subject } from 'rxjs';
import { Alumno } from 'src/app/interface/login';


@Component({
  selector: 'app-csviaje',
  templateUrl: './csviaje.component.html',
  styleUrls: ['./csviaje.component.scss'],

})
export class CsviajeComponent implements OnInit {
 viajes: Viajes[];
correo = '';
asunto = '';
mensaje = '';
nombreviaje: any;
usuario: Alumno;
  // eslint-disable-next-line max-len
  constructor(private dbservice: BdviajesService,private router: Router, public toastController: ToastController,private loadingCtrl: LoadingController,private activeroute: ActivatedRoute,private authService: AuthService ,private emailComposer: EmailComposer) { 
    this.authService.getAuthedUser().then(() =>{
      this.usuario = this.authService.authedUser;
    }); 
  }

  ngOnInit() {
     this.dbservice.dbState().subscribe((res)=>{
      if(res){
        this.dbservice.fetchViajes().subscribe(item=>{
          this.viajes=item;
        });
      }
    });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Mandando Correo',
      duration: 2000,
      translucent: true,
    });

    loading.present();
  }

  /*eliminar(item) {
    this.dbservice.deleteViajes(item.id);
    this.dbservice.presentToast('Viaje Eliminada');
  }*/
  enviarcorreo(correoconductor,correoalumno,asunto,mensaje){
    const email ={
      to:correoalumno,
      cc: correoconductor,
      subject:asunto,
      body: mensaje
    };
    this.emailComposer.open(email)
  }
  solicitarviaje(item){
  const nuevacapacidad = item.capacidad-1
  this.dbservice.updateCapacidad(item.id,nuevacapacidad)
  const correoconductor = item.usuarioconductor + '@duocuc.cl'
  const correoalumno = this.usuario.username + '@duocuc.cl'
  const asunto = 'Confirmación de reserva de viaje TeLlevoAPP'
  const mensaje = 'Los datos de su reserva son: \n' + '\n' 
  +
  'Nombre del conductor: ' + item.nombreconductor + '\n' + '\n' +
  'Modelo: ' + item.marca + '\n' + '\n'  +
  'Patente: ' +  item.patente + '\n' + '\n'  +
  'Precio: '+'$' + item.horasalida + '\n' + '\n' +
  'Hora Salida: ' + item.precio + '\n' + '\n' +

  'Gracias por confiar en TeLlevoAPP'
   this.enviarcorreo(correoconductor,correoalumno,asunto,mensaje);
   this.showLoading();
    this.router.navigate(['home/main']);
  }
  }
