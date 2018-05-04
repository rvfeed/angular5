import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { CommService } from '../comm.service';
import { UserComponent } from '../app.classtypes';
import { Subscription }    from 'rxjs/Subscription';

@Component({
  selector: 'app-inner',
  templateUrl: './inner.component.html',
  styleUrls: ['./inner.component.css']  
  
})
export class InnerComponent implements OnInit, OnDestroy {
  users: Array<UserComponent> = [];
  name: string;  
  education: string;
  myUser: FormGroup;
  subscription: Subscription; 
  
  @Output() ee = new EventEmitter<any>();
  constructor(private comm: CommService) {
 
   }
  
  ngOnInit() {
this.myUser = new FormGroup({
      name: new FormControl(""),
      education: new FormControl("")
  });
    this.users.push(new UserComponent("Raja", 33, "B. Tech"));
  
  }
  save(){  
    console.log(this.myUser);
    this.comm.logIt(this.myUser.value);
 //   this.ee.emit(this.myUser.value);
    this.users.push(new UserComponent(this.myUser.value.name, 0, this.myUser.value.education))
  }
   ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
       // this.subscription.unsubscribe();
    }

}
