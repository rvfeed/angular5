import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { WindowRef } from '../app.windowref';
import { messages, urls } from '../app.constants';
@Component({
        selector: "register",
        template: `<div class="col-md-3 left card">
  <form [formGroup] = "myRegisterFrom" novalidate>  <h2> Login</h2>
  <div class="form-group row">
   {{message}}
    <div class="col-sm-8">
    <input type="text" formControlName="username" class="form-control"name="username" placeholder="Username"/>
    <p *ngIf="username.errors">Please enter username</p> 
    </div>
    
   </div>
     <div class="form-group row">
        <div class="col-sm-8">
    <input type="text" class="form-control" formControlName="password"  name="password" placeholder="Password"/>
    <p *ngIf="password.errors && (password.dirty || password.touched)">Please enter password</p> 
        </div>
 
      </div>
         <div class="form-group row">
        <div class="col-sm-8">
    <input type="text" class="form-control" [ngClass]="" formControlName="email"  name="email" placeholder="Email"/>
         
         <p *ngIf="email.errors && (email.dirty || email.touched)">Please enter valid email address</p> 

        </div>

      </div>
     <div class="form-group">
    <input type="button" class="btn btn-primary" name="submit" value="Register" (click)="register()"/>
    <a href="#/login">login</a>
   </div>
   <br/>
  </form>
</div>`
})
export class RegisterComponent implements OnInit{
   myRegisterFrom: FormGroup;
   username: FormControl;
   password: FormControl;
   email: FormControl;
   message: string;
   constructor(private z: WindowRef, private http: HttpClient){
      //  super(z)
   }    
   ngOnInit(){
       this.username = new FormControl("", Validators.required);
       this.password = new FormControl("", Validators.required);
       this.email = new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)@\w+([\-]?\w+)(\.\w{2,6})+$/)]));
this.myRegisterFrom = new FormGroup({
    username: this.username,
    password: this.password,
    email: this.email
});
console.log("this,", this)
 //this.IntiateDb();
      
   }
   register(){
       if(this.myRegisterFrom.valid){
           console.log(urls.registerUrl)
           this.http.post(urls.registerUrl,  this.myRegisterFrom.value )
           .subscribe( (msg) => {
               console.log(messages.registration.success);
           })
           //this.add({id: this.username.value, data: this.myRegisterFrom.value }).then((msg)=> console.log(this.message = msg));
       }
       console.log(this.myRegisterFrom.valid);
   }
}