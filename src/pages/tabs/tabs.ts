import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController } from 'ionic-angular';
import { HomePage,BienvenidaPage,PromoPage,ListaPage,FavoritasPage,NosotrosPage } from '../pages';
import {PromocionesProvider} from "../../providers/promociones/promociones";
import { LocalNotifications } from '@ionic-native/local-notifications';
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  public home = HomePage;
  public promopage = PromoPage;
  public listapage = ListaPage;
  public nosotrospage = NosotrosPage;
  public favoritaspage = FavoritasPage;
  public noti:any;
  public bienvenida = BienvenidaPage;
  constructor(private localNotifications: LocalNotifications,public loadingCtrl: LoadingController,private promo:PromocionesProvider,public navCtrl: NavController) {
    this.noti = false;

    }
  recargar() {
    let loader = this.loadingCtrl.create({
     content: "Actualizando Datos...",
     duration: 1000
   });
   loader.present();
    this.promo.actualizar();
  }

  ionViewDidLoad() {

  }


}
