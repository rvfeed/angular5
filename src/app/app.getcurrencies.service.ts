import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CurResponse } from './app.curtype';

@Injectable()
export class AppGetcurrenciesService {
  _exUrl:string = "http://api.fixer.io/latest";
  constructor(private http: HttpClient) {

   }
  set exUrl(url){
      this._exUrl = url;
  }
 get exUrl(){
   return this._exUrl;
 }
  formUrl(fromCur:string, toCur:string): string{
     return this.exUrl+"?symbols="+fromCur+","+toCur;
  }
  covertMoney(obj){     
     const { from, fromCur, toCur } = obj;
    return function(res){
      if(Object.keys(res.rates).length == 1)
          res.rates["EUR"] = 1;
      return (res.rates[toCur]/res.rates[fromCur])*from;;
    }       
  }
  getAllCurrency(){
    return this.http.get(this.exUrl)
  }
  getCurrencies(currencies: Array<string>, res: CurResponse){
   var obj = {};
     currencies.forEach((cur: string) => {           
          obj[cur] = (res.rates[cur] || 1)/res.rates["USD"]           
    });
    return obj;
 
}
}
