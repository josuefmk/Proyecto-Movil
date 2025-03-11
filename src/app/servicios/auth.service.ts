import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { Alumno, AlumnosI } from '../interface/login';

export interface User {
  name: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   authedUser: Alumno;
  private _storage: Storage | null = null;
  apiURL = 'https://nancyb3a.github.io/Test/usuarios_PGY4121_03.json';
  
  currentUser: BehaviorSubject<User> = new BehaviorSubject(null);
  constructor(private http: HttpClient, private storage: Storage) { 
    this.init();
  }

  getUserSubject() {
    return this.currentUser.asObservable();
  }

  Getlogin() {
    return this.http.get<AlumnosI>(this.apiURL);
  }

  login(usuario) {
    try {
      this._storage.set('usuario', usuario);
      console.log(usuario)
      this._storage.set('authed', true);
    return true;
    } catch{
    return null;
    }
  }

  setRol(rol) {
    if (rol === 'conductor') {
      this.currentUser.next({
        name: 'CONDUCTOR',
        roles: ['read-content', 'cond', 'conductor']
      });
    } else if (rol === 'pasajero') {
        this.currentUser.next({
          name: 'PASAJERO',
          roles: ['read-content', 'pasajero', 'pasajero']
        });
    }
  }

 async getAuthedUser(){
  const authedUser = await this.storage.get('usuario');
  console.log(authedUser)
  if(authedUser){
    this.authedUser = authedUser;
  }
 }
  
 async isAuthenticated(){
  return await this.storage.get('authed')
 }

  logout() {
    this.authedUser = undefined
    this.storage.remove('usuario');
    this.storage.remove('authed')
    this.currentUser.next(null);
  }

  hasRole(roles: string []): boolean {
    for (const oneRole of roles) {
      if (!this.currentUser.value || !this.currentUser.value.roles.includes(oneRole)){
        return false;
      }
    }
    return true;
  }

  async checkAuth() {
    const usuario = await this.storage.get('usuario');
    if (usuario) {
      return true;
    }
    return false;
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
}
