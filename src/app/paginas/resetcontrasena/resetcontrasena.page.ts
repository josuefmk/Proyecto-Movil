/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController, ToastController ,} from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { Storage } from '@ionic/storage-angular';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
@Component({
  selector: 'app-resetcontrasena',
  templateUrl: './resetcontrasena.page.html',
  styleUrls: ['./resetcontrasena.page.scss'],
})
export class ResetcontrasenaPage implements OnInit {
field: any;
credentials = {
  username: '',
};
mailto = '';
alumnos: any;
  constructor(private router: Router,private loadingCtrl: LoadingController,public toastController: ToastController, private authService: AuthService, private storage: Storage,private emailComposer: EmailComposer) { }

  ngOnInit() {
  }


   volver(){
    this.router.navigate(['/login']);
   }

   enviarcorreoresetcontra(correoalumno,asunto,mensaje){
    const email ={
      to:correoalumno,
      subject:asunto,
      body: mensaje
    };
    this.emailComposer.open(email)
  }

   rcontrasena(){
    if (this.validateModel(this.credentials)) {
      this.authService.Getlogin().subscribe(async (res) => {
        this.alumnos = res.alumnos;
        for (const alumno of this.alumnos) {
          if (this.credentials.username === alumno.username){
            const correoalumno = alumno.username + '@duocuc.cl'
            const asunto = 'Recuperar contraseña de su cuenta TeLlevoAPP'
            const mensaje = 'Se ha solicitado una recuperacion de contraseña de su cuenta TeLlevoAPP\n' + '\n' 
            + 'Tu contraseña es: ' + alumno.password + '\n' + '\n' +
            'Si no ha solicitado una recuperación de contraseña, olvide este mensaje. ' + '\n' + '\n' +
            + '\n' + '\n' + 'Saludos'  + '\n' + '\n' +
            'TeLLevoAPP'
            this.enviarcorreoresetcontra(correoalumno,asunto,mensaje)
          this.showLoading();
          this.router.navigate(['/login']);
            break;
          }
        }
      });
    }else{
      this.presentToast('Falta un dato: '+this.field);
    }
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Mandando Correo',
      duration: 2000,
      translucent: true,
    });

    loading.present();
  }
  validateModel(model: any) {
    for (const [key, value] of Object.entries(model)) {
      if (value === '') {
        this.field = key;
        return false;
      }
    }
    return true;
  }
  async presentToast(msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 1500
    });
    toast.present();
  }
  }
