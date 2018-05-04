import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InnerComponent } from '../inner/inner.component';
import { CommService } from '../comm.service';


@Component({
  selector: 'user-details',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']  
})
export class UserComponent{
 @Input() User = "Raja";
 userList: string[];
 @Output() userE : EventEmitter<string> = new EventEmitter<string>(); 
  constructor(private comm: CommService) {
    console.log("constr user", this)
    comm.userDetails$.subscribe(u =>{
      console.log("this.comm.userDetails$sdfasd")
      this.userList = u;
    }); 
   }
ngOnInit(){
  this.userE.emit("user emit")
}
  serviceFn() {
this.comm.logIt("asdfasd")
    console.log("users,", this);
    setTimeout(()=> {
      this.User = "Bapu";
    }, 2000);
    console.log(this.comm.getUsers());
  }
  ngOnChanges(){
      console.log("users,", this);
  }
  evEx(e){
console.log("Emitted!", e)
  }
   

}
