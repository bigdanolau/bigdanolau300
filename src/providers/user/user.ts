import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//Providers
import {URL_SEVICES} from "../../config/url";
@Injectable()
export class UserProvider {
  public usuario:any[] = [];
  constructor(public http: Http) {

  }
  validar(email:string,pass:string){
    return new Promise((resolve,reject)=>{
      this.http.get(URL_SEVICES+"users",{params:{
        email: email,
        pass: pass
      }}).subscribe(data=>{
        let datos:any[] = data.json();
        if (datos === null) {
          resolve(false);
        }
        else{
          this.usuario = data.json();
          resolve(true);
        }
     })
    })

  }
}
