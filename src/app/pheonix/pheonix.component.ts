import { Component, OnInit, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommService } from '../comm.service';

@Component({
  selector: 'app-pheonix',
  templateUrl: './pheonix.component.html',
  styleUrls: ['./pheonix.component.css']
})
export class PheonixComponent implements OnInit {
  myForm: FormGroup;
  @Input() testhanges = "1";
  companyE: EventEmitter<string>;
 companies: string[] = ["Valuelabs", "Kony", "Optum", "HCL"];
  comp: string = this.companies[0];  
  constructor(private comm: CommService) {
    comm.broadcastCompany(this.comp);
   }
 eventTest(text){
   console.log(text)
 }
  ngOnInit() {
   this.myForm = new FormGroup({
     company: new FormControl("")
   });
   
    //
  }
  ngOnChanges(changes: SimpleChanges){
console.log("changes", changes)
}
  testE(r){
  console.log("testE", r)
}
ngAfterContentInit(){
  console.log("ngAfterContentInit")
}
  changeCompany(){
   
    console.log("get", this.myForm.get("company"));  
  this.comp =  this.myForm.value.company;
    this.comm.broadcastCompany(this.comp);
    this.companyE.emit(this.comp);
    console.log(this.myForm.value.company);
  }
    sayIt(){
    console.log("sayIt()")
  
  }

}
