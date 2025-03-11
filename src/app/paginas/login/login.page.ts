/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Injectable} from '@angular/core';
import { AlertController, LoadingController,ToastController } from '@ionic/angular';
import { BdviajesService } from 'src/app/servicios/bdviajes.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],

})
@Injectable({
  providedIn: 'root'
})
export class LoginPage implements OnInit {

  credentials = {
    username: '',
    password: '',
  };
  field: any;
  alumnos: any;
  constructor(private router: Router, public toastController: ToastController,private loadingCtrl: LoadingController, private sqlite: SQLite,
    private alertController: AlertController, private authService: AuthService) {

  }

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit() {
  }

  async ingresar() {
    if (this.validateModel(this.credentials)){
       await this.showLoading();
      let authed;
      this.authService.Getlogin().subscribe(async (res) => {
        this.alumnos = res.alumnos;
        for (const alumno of this.alumnos) {
          if (this.credentials.username === alumno.username){
            if (this.credentials.password === alumno.password){
              authed = this.authService.login(alumno)
              this.presentToast('Bienvenido  ' + alumno.nombre);
              break;
            }
          }
        }
        if(authed){
          await this.router.navigate(['home/main']);
        }else{
        await this.presentToast('Usuario o contraseña incorrectos');
        }
      });
    } else {
      this.presentToast('Falta un dato:'  + this.field);
    }
  }

  recuperar(){
     this.router.navigate(['/resetcontrasena']);
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
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando Sesion',
      duration: 1000,
      translucent: true,
    });

    loading.present();
  }
}
