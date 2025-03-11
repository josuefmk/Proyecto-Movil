/* eslint-disable max-len */
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from 'src/app/servicios/auth.service';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    SharedDirectivesModule
  ],
  declarations: []
})

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('fadein',[
      state('void', style({opacity: 0})),
      transition('void => *',[
        style({opacity: 0}),
        animate('300ms 300ms ease-out', style({opacity: 1}))

      ])
    ]),
  ]
})
export class MainComponent implements OnInit {
user: any;
authenticated = false;
  constructor(private router: Router,private activeroute: ActivatedRoute,public toastController: ToastController, private authService: AuthService ) {
    this.activeroute.queryParams.subscribe(() => {
      if(this.router.getCurrentNavigation().extras.state) {
        this.user=this.router.getCurrentNavigation().extras.state.user;
      }
    });
  }

  ngOnInit() {
    this.authService.getUserSubject().subscribe(authState => {
      this.authenticated = authState ? true : false;
    });
  }

  loginPasajero() {
    this.authService.setRol('pasajero');
  }

  loginConductor() {
    this.authService.setRol('conductor');
  }
 



  segmentChanged($event: { detail: { value: any; }; }){
    let direccion=$event.detail.value;
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['home/'+direccion],navigationExtras);
 }

}
