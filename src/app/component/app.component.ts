import { Component, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { AppGetcurrenciesService } from '../app.getcurrencies.service';
import { CurResponse } from '../app.curtype';
import { PheonixComponent } from "../pheonix/pheonix.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent {
  title:string = 'Forex Exchange';
  myFrom : FormGroup;
  fromCurrency:number = 1;
  hello: string = "okko";
  toCurrency:number = 1; 
  result: number;
  testC : number = 1;
  @ViewChildren(PheonixComponent) pheonixView: QueryList<PheonixComponent>;
  showCurrencies: Object;  
   currencies:Array<string> = ["USD", "INR", "EUR", "GBP"]
  allCurrencies: Array<string> = ["INR","AUD", "BRL", "CAD", "CNY", "GBP", "HKD",  "JPY","NZD", "PHP", "SGD"]
  constructor(private http: HttpClient, private cur : AppGetcurrenciesService){
    
  }
  ngAfterViewInit(){
    let find = this.pheonixView.toArray();
   // find[0].companyE.on("")
    console.log(this.pheonixView.toArray());
  }
  testE(v){
    console.log("vvvvvv", v);
  }
  ngOnInit(){  
    this.myFrom = new FormGroup({
      from: new FormControl(1),
      to: new FormControl(),
       fromCur : new FormControl("USD"),
      toCur: new FormControl("INR")
    })
    setTimeout( () => { this.testC++; }, 3000);
    console.log(this.myFrom);
    this.cur.getAllCurrency().subscribe((res: CurResponse) => {
      this.showCurrencies = this.cur.getCurrencies(this.allCurrencies, res);
    });
    this.convert();
  } 

  convert(){
     console.log(this.myFrom.value);
    let url:string = this.cur.formUrl(this.myFrom.value.fromCur, this.myFrom.value.toCur);    
    var toCurrency = this.cur.covertMoney(this.myFrom.value);    
    this.http.get(url).subscribe((res : CurResponse) => {      
      this.toCurrency = toCurrency(res);   
    });    
  }
 
}
