import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {URL_SEVICES,PATH} from "../../config/url";
@Component({
  selector: 'page-promo',
  templateUrl: 'promo.html',
})
export class PromoPage {
  public promo:any;
  public path:string = PATH;
  public inicio:any;
  public fin:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.promo = this.navParams.data;
    this.inicio = new Date(this.promo.fecha_inicial).toLocaleDateString();
    this.fin = new Date(this.promo.fecha_final).toLocaleDateString();
    console.log(this.promo);
  }

  ionViewDidLoad() {

  }

}
