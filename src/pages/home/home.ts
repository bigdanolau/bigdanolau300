import { Component } from '@angular/core';
import { NavController,ViewController,App  } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
import { AlertController,LoadingController  } from 'ionic-angular';
import {PromocionesProvider} from "../../providers/promociones/promociones";
import { Http } from '@angular/http';
import {URL_SEVICES,PATH} from "../../config/url";

//Páginas
import {PromoPage,TabsPage} from "../pages";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  promopage:any;
  public  cercanas:any[] = [];
  public tabspage:any;
   public lat: number;
   public lng: number;
   public keys:any = {};
   public categorias:any[] = [];
   public filtro_activo:string;
   items: string[] = [];
   buscando:boolean;
   public filtro:boolean;
   public zoom:number;
  constructor(public appCtrl: App,public viewCtrl: ViewController,private storage: Storage,private localNotifications: LocalNotifications,public http: Http,public loadingCtrl: LoadingController,private promo:PromocionesProvider,public alertCtrl: AlertController,private diagnostic: Diagnostic,public navCtrl: NavController,public geolocation: Geolocation) {
    this.promopage = PromoPage;
    this.tabspage = TabsPage;
    this.lat = 10.4094768;
    this.lng = -75.5282278;
    this.zoom = 15;
    this.get_position();
    this.get_cat();
    this.filtro = false;

    this.localNotifications.on("click",function(notification){
this.navCtrl.push(PromoPage,JSON.parse(notification.data));
}.bind(this));
    this.diagnostic.registerLocationStateChangeHandler((dato)=>{
      if (this.diagnostic.locationMode.LOCATION_OFF) {
          this.obtener_location();
      }
      else{

        this.obtener_location();
      }

    });
    this.storage.set('mostrada','false');

  }
  get_position(){
    let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
       this.lat = data.coords.latitude;
       this.lng = data.coords.longitude;
       let dis = this.getKilometros(this.lat,this.lng,10.386182,-75.493403);
       var control:any;
       for (var i=0; i<this.promo.promociones.length; i++)
        {
          this.storage.get("cercanas").then(data=>{
            this.cercanas = data;
          });
            if(parseInt(this.getKilometros(this.lat,this.lng,this.promo.promociones[i]['latitud'],this.promo.promociones[i]['longitud']))   <= 0
                && this.cercanas.indexOf(this.promo.promociones[i]['id']) === -1){
                 this.localNotifications.schedule({
                   id: this.promo.promociones[i]['id'],
                   title: this.promo.promociones[i]['titulo'],
                   text: "¡Esta promoción está muy cerca de ti!",
                   icon: ''+PATH+'assets/img/icon.png' ,
                   data: this.promo.promociones[i]
                 });
                 this.cercanas  = this.cercanas.filter(Boolean);
                 this.cercanas.push(this.promo.promociones[i]['id']);
                 this.storage.set("cercanas",this.cercanas);
               }
               if(parseInt(this.getKilometros(this.lat,this.lng,this.promo.promociones[i]['latitud'],this.promo.promociones[i]['longitud']))   > 0
                   && this.cercanas.indexOf(this.promo.promociones[i]['id']) !== -1){
                  this.cercanas.slice(this.cercanas.indexOf(this.promo.promociones[i]['id']),1);
                   }
        }
     });
  }
  getKilometros(lat1,lon1,lat2,lon2)
{
    var rad = function(x) {return x*Math.PI/180;}
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad( lat2 - lat1 );
    var dLong = rad( lon2 - lon1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d.toFixed(3); //Retorna tres decimales
}
  get_cat(){
    let url = URL_SEVICES+"promociones/get_categorias/";
    this.http.get(url).subscribe(data=>{
      this.items = data.json();
    });
  }
  get_filter(nombre:string){
    this.promo.get_filter(nombre);

    if (nombre !== '') {
      this.zoom = 14;
      this.filtro_activo = nombre;
      this.filtro = true;
      this.buscando = false;
    }else{
      this.zoom = 15;
      this.filtro= false;
    }

  }
  getItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.buscando = true;
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else{
      this.get_cat();
      this.buscando = false;
    }
  }


  //Convertir a String location:
  ConvertString(value){
return parseFloat(value)
}
//=========================================================================
  ionViewDidEnter(){
    this.obtener_location();

  }
  ionViewWillEnter(){

  }
  obtener_location(){
    this.diagnostic.isLocationEnabled().then(
  (isAvailable) => {
   if(isAvailable){
     this.diagnostic.isLocationAuthorized().then((autorizado)=>{
       if (!autorizado) {
           this.diagnostic.requestLocationAuthorization().then((estado)=>{
             if (estado == 'GRANTED') {
                 this.obtener_location();
             }
             else{
               return;
             }
           });


       }
       else{
            this.get_position();
       }
     });

   }
   else {
     let confirm = this.alertCtrl.create({
      title: 'Necesitamos tu ubicación ',
      message: 'Queremos mostrarte las mejores promociones y que estén cerca.',
      buttons: [
        {
          text: 'Activar GPS',
          handler: () => {
            this.diagnostic.switchToLocationSettings();
          }
        },
        {
          text: 'Cancelar',
          handler: () => {

          }
        }
      ]
    });
    confirm.present();
   }

  }).catch( (e) => {

   });

  }


}
