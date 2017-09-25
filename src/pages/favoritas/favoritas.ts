import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PromocionesProvider} from "../../providers/promociones/promociones";
import {URL_SEVICES,PATH} from "../../config/url";
@Component({
  selector: 'page-favoritas',
  templateUrl: 'favoritas.html',
})
export class FavoritasPage {
  public path:any = PATH;
  constructor(private promo:PromocionesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  cargar(infiniteScroll){
    this.promo.get_favoritos().then(success=>{
      infiniteScroll.complete();
    });
  }
}
