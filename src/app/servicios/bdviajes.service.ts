
/* eslint-disable prefer-const */
/* eslint-disable max-len */
import { Injectable} from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Viajes } from '../clases/viajes';
import { AuthService } from 'src/app/servicios/auth.service';
@Injectable({
  providedIn: 'root'
})
export class BdviajesService {

  public database: SQLiteObject;

  tblviajes= 'CREATE TABLE IF NOT EXISTS viajes(id INTEGER PRIMARY KEY autoincrement, marca VARCHAR(50) NOT NULL,patente VARCHAR(6) NOT NULL,precio NUMBER(10) NOT NULL, horasalida NUMBER(4) NOT NULL,capacidad NUMBER(4) NOT NULL,ubicacion VARCHAR(400) NOT NULL, nombreconductor VARCHAR(100) NOT NULL,usuarioconductor VARCHAR(50) NOT NULL);';

  listaViajes = new BehaviorSubject([]);
  private isDbReady:
    BehaviorSubject<boolean> = new BehaviorSubject(false);
   
  constructor(private sqlite: SQLite,
    private platform: Platform,
    public toastController: ToastController,private authService: AuthService) {

     
      this.crearbasedatos();
    }
  crearbasedatos() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'viajes.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.crearTablas();
      }).catch(e => this.presentToast(e));
    });
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.tblviajes,[]);
      console.log(this.database.executeSql);
      this.cargarViajes();
      this.isDbReady.next(true);
    } catch (error) {
      this.presentToast('Error en Crear Tabla: '+error);
    }
  }

  cargarViajes() {
    return this.database.executeSql('SELECT * FROM viajes',[])
    .then(res=>{
      let items: Viajes[]=[];
      if(res.rows.length>0){
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
          id: res.rows.item(i).id,
          marca: res.rows.item(i).marca,
          patente: res.rows.item(i).patente,
          precio: res.rows.item(i).precio,
          horasalida: res.rows.item(i).horasalida,
          capacidad: res.rows.item(i).capacidad,
          ubicacion: res.rows.item(i).ubicacion,
          usuarioconductor: res.rows.item(i).usuarioconductor,
          nombreconductor: res.rows.item(i).nombreconductor
          });
        }
      }
      this.listaViajes.next(items);
    });
  }
  addViajes(marca,patente,horasalida,precio,capacidad,ubicacion){
     this.authService.getAuthedUser().then(() =>{
      const nombreconductor = this.authService.authedUser.nombre;
      const usuarioconductor = this.authService.authedUser.username
      let data=[marca,patente,horasalida,precio,capacidad,ubicacion,nombreconductor,usuarioconductor];
      return this.database.executeSql('INSERT INTO viajes(marca,patente,horasalida,precio,capacidad,ubicacion,nombreconductor,usuarioconductor) VALUES(?,?,?,?,?,?,?,?)',data)
      .then(()=>{
        this.cargarViajes();
      });
    }); 
 
  }
  updateViajes(id,marca,patente,horasalida){
    this.authService.getAuthedUser().then(() =>{
      const usuario = this.authService.authedUser.username;
      let data=[id,marca,patente,horasalida,usuario];
      return this.database.executeSql('UPDATE viajes SET  horasalida=? marca=? patente=? WHERE id=?',data)
      .then(()=>{
        this.cargarViajes();
      });
    }); 
   
  }
  deleteViajes(id){
    return this.database.executeSql('DELETE FROM viajes WHERE id=?',[id])
    .then(()=>{
      this.cargarViajes();
    });
  }
   
  updateCapacidad(id,capacidad){
   let data=[capacidad,id]
   return this.database.executeSql('UPDATE viajes SET capacidad=? WHERE id=?',data)
  .then(()=>{
    this.cargarViajes();
  });
  }

  fetchViajes(): Observable<Viajes[]> {
    return this.listaViajes.asObservable();
  }
  dbState(){
    return this.isDbReady.asObservable();
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}

