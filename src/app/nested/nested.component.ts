import { Component, OnInit } from '@angular/core';
import { CommService } from '../comm.service';
import 'core-js/es7/reflect';

@Component({
  selector: 'app-nested',
  template: `  <app-inner (ee) = "raiseEvnt($event)"></app-inner>`,  
  styleUrls: ['./nested.component.css']   
})
export class NestedComponent implements OnInit {

  constructor(private comm : CommService) { 
    this.comm.userDetails$.subscribe(u =>{
      console.log("NestedComponent this.comm.userDetails$")
      console.log(u);
    }); 
  }

  ngOnInit() {
  }
 raiseEvnt(e){
     console.log("Emitted!!!", e);
   }

}
