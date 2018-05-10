import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router"
import { FormGroup, FormControl } from "@angular/forms";
import { DbModal } from './services/app.mongodb';
import { WindowRef } from './app.windowref';
@Component({
        selector: "login",
        template: `<div class="col-md-3 left card">
        <span class="has-danger">{{message}}</span>
  <form [formGroup] = "myLoginFrom" novalidate>  <h2> Login</h2>
  <div class="form-group row">
   
    <div class="col-sm-8">
    <input type="text" formControlName="username" class="form-control"name="username" placeholder="Username"/>
    </div>
    
   </div>
     <div class="form-group row">
        <div class="col-sm-8">
    <input type="text" class="form-control" formControlName="password"  name="password" placeholder="Password"/>
        </div>
 
      </div>
     <div class="form-group">
    <input type="button" class="btn btn-primary " name="submit" value="Login" (click)="login()"/>
    <a routerLink="/register">Register</a>
   </div>
   <br/>
  </form>
</div>
<router-outlet></router-outlet>`,
providers: [DbModal]
})
export class LoginComponent   implements OnInit{
   myLoginFrom: FormGroup;
   message: string;
   constructor(private x: WindowRef, private router: Router, private db: DbModal){
       
   }   
   ngOnInit(){
       console.log("this", this)      
this.myLoginFrom = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
})
   }
   login(){
       console.log(this.myLoginFrom)
       this.db.getUser(this.myLoginFrom.value.username).subscribe((result) =>{
           if(result.password == this.myLoginFrom.value.password){                
                this.x.nativeWindow.localStorage.setItem("user", this.myLoginFrom.value.username);
                this.router.navigate(['home']);
           }else{
               this.message = "Please enter valid credentials";
           }
       });       
   }
}