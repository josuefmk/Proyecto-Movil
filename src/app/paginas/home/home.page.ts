/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router,NavigationExtras} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage implements OnInit  {

  nombreviaje: any;

  constructor(private router: Router,private activeroute: ActivatedRoute,public toastController: ToastController, private authService: AuthService) {
    authService.getAuthedUser().then(() =>{
      this.nombreviaje = authService.authedUser.nombre;
    });
  }

  ngOnInit() {const navigationExtras: NavigationExtras = {
    state: {
    
    }
  };
  this.router.navigate(['home/main'],navigationExtras);}
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
