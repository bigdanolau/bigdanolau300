import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import {URL_SEVICES} from "../../config/url";
import {LoginPage} from "../pages";
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
  public user:any = {
    nombre:  "",
    password:  "",
    edad: null,
    celular: null,
    ciudad:  "",
    email:  ""
  };
  public ciudades:any[] = [];
  constructor(private alertCtrl: AlertController,public _http:Http,public navCtrl: NavController, public navParams: NavParams) {

    this._http.get(URL_SEVICES+"users/ciudades").subscribe(data=>{
      this.ciudades = data.json();

    });
  }
  registrar(){
    let error = true;
    this._http.get(URL_SEVICES+"users/registrar",{params: this.user}).subscribe(
      data=>{
      error = false;
      console.log(data + "daniel");
    },error=>{
      let alert = this.alertCtrl.create({
           title: 'Datos incorrectos',
           subTitle: "Usuario Ya existe o Datos incorrectos.",
           buttons: ['Ok']
         });
         alert.present();
    },()=>{
      let alert = this.alertCtrl.create({
           title: '¡Bienvenido a Lufy App!',
           subTitle: "¡Usuario Registrado!",
           buttons: ['Iniciar sesión']
         });
         alert.present();
      this.navCtrl.push(LoginPage);
    });
  }
}
