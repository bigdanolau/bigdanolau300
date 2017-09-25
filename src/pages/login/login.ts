import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
// plugins
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

//pages
import {TabsPage,RegistrarPage} from "./../pages";
//providers
import {URL_SEVICES} from "../../config/url";
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public registrar = RegistrarPage;
  public email:string ="";
  public pass:string = "";
  constructor(private storage: Storage,public _http:Http,private alertCtrl: AlertController,public user:UserProvider,public navCtrl: NavController, public navParams: NavParams) {

  }
loguear(){
  this.user.validar(this.email,this.pass).then(data=>{
    if (!data) {
      let alert = this.alertCtrl.create({
         title: 'Datos incorrectos',
         subTitle: 'Si no tienes una cuenta, puedes registrarte ¡GRATIS!',
         buttons: ['Ok']
       });
       alert.present();
    }
    else{
      this.storage.set("usuario",data);
      this.navCtrl.setRoot(TabsPage);
    }
  });
}

recuperar(){
  let prompt = this.alertCtrl.create({
  title: 'Recuperar contraseña',
  message: "Ingresa tu Email para envíarte tu contraseña temporal",
  inputs: [
    {
      name: 'email',
      placeholder: 'Email',
      type: 'email'
    },
  ],
  buttons: [
    {
      text: 'Cancelar',
      handler: data => {

      }
    },
    {
      text: 'Envíar',
      handler: data => {
        this._http.get(URL_SEVICES+"users/recuperar",{params:{
          email: data.email
        }}).subscribe(data=>{

        },error=>{
          let alert = this.alertCtrl.create({
             title: 'Datos incorrectos',
             subTitle: 'Revisa que tu Email esté correcto.',
             buttons: ['Ok']
           });
           alert.present();
        },()=>{
          let alert = this.alertCtrl.create({
             title: 'Contraseña Enviada.',
             subTitle: 'Revisa tu Email',
             buttons: ['Ok']
           });
           alert.present();
        });
      }
    }
  ]
});
prompt.present();

}
  ionViewWillEnter() {
    this.storage.get("cercanas").then(data=>{
        if (data){
            this.navCtrl.setRoot(TabsPage);
        }
    });
  }

}
