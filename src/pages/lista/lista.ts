import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PromocionesProvider} from "../../providers/promociones/promociones";
import {URL_SEVICES,PATH} from "../../config/url";
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {
  public path:any = PATH;
  constructor(private promo:PromocionesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

    //
    cargar(infiniteScroll){
      this.promo.get_todas().then(success=>{
        infiniteScroll.complete();
      });

    }


}
