/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { BdviajesService} from 'src/app/servicios/bdviajes.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-cmviajes',
  templateUrl: './cmviajes.component.html',
  styleUrls: ['./cmviajes.component.scss'],
})
export class CmviajesComponent implements OnInit {
  idViaje = "";
  horaViaje = "";
  marcaViaje = "";
  patenteViaje = "";
  constructor(private dbservice: BdviajesService,private router: Router,private activedroute: ActivatedRoute) { 
}
edit(){
  this.dbservice.updateViajes(this.horaViaje,this.marcaViaje,this.patenteViaje,this.idViaje);
  this.dbservice.presentToast("Viaje Modificado");
  this.router.navigate(['home/main']);
}
  ngOnInit() {}

}
