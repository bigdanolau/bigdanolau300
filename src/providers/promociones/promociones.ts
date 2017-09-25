import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {URL_SEVICES} from "../../config/url";
@Injectable()
export class PromocionesProvider {
  public promociones:any[] = [];
  public t_promociones:any[] = [];
  public favoritos:any[] = [];
  public pagina:number = 0;
  public pagina_f:number = 0;
  public limite:number = 1;
  public final:boolean = false;
  public final_f:boolean = false;
  public categorias:any[] = [];
  constructor(public http: Http) {
    this.get_promos();
    this.get_todas();
    this.get_categorias();
    this.get_favoritos();
  }
  actualizar(){
    this.get_promos();
    this.t_promociones = [];
    this.pagina = 0;
    this.final = false;
    this.final_f = false;
    this.get_todas();
    this.get_favoritos();
  }
  get_promos(){
     this.http.get(URL_SEVICES+"promociones").subscribe(data=>{
      this.promociones = data.json();
    })
  }
  get_filter(nombre:string){
     this.http.get(URL_SEVICES+"promociones/filter",{params:{
       categoria: nombre
     }}).subscribe(data=>{
      this.promociones = data.json();
    })
  }
  get_todas(){
    return new Promise((resolve,reject)=>{
      let url = URL_SEVICES+"promociones/get_promos/";
      this.http.get(url,{params:{
        pagina: this.pagina,
        limite: this.limite
      }}).subscribe(data=>{
        let calcular:any[] = data.json();
        if (calcular.length == 0) {
            this.final = true;
        }else{
          this.t_promociones = this.t_promociones.filter(Boolean);
          for (let i = 0; i < data.json().length; i++) {
              this.t_promociones.push(data.json()[i]);
          }
          this.pagina +=1 ;

          resolve()
        }
      });
    });

  }
  get_favoritos(){
    return new Promise((resolve,reject)=>{
      let url = URL_SEVICES+"promociones/get_favoritos/";
      this.http.get(url,{params:{
        pagina: this.pagina_f,
        limite: this.limite
      }}).subscribe(data=>{
        let calcular:any[] = data.json();
        if (calcular.length == 0) {
            this.final_f = true;
        }else{
          this.favoritos = this.favoritos.filter(Boolean);
          for (let i = 0; i < data.json().length; i++) {
              this.favoritos.push(data.json()[i]);
          }
          this.pagina_f +=1 ;

          resolve()
        }
      });
    });

  }
  get_categorias(){
    return new Promise((resolve,reject)=>{
      let url = URL_SEVICES+"promociones/get_categorias/";
      this.http.get(url).subscribe(data=>{
        this.categorias.push(data.json());
        //(data);
      });
    });
  }
  }
