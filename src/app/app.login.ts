import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router"
import { FormGroup, FormControl } from "@angular/forms";
import { IndexDBModal } from './app.indexdb';
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
providers: [IndexDBModal]
})
export class LoginComponent   implements OnInit{
   myLoginFrom: FormGroup;
   message: string;
   constructor(private x: WindowRef, private router: Router, private indexDB: IndexDBModal){
       
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
       this.indexDB.read(this.myLoginFrom.value.username).then((result) =>{
           if(result.data.password == this.myLoginFrom.value.password){
                this.router.navigate(['home'])
                this.x.nativeWindow.localStorage.setItem("user", this.myLoginFrom.value.username)
           }else{
               this.message = "Please enter valid credentials";
           }
console.log(result)
       })
       console.log(this.myLoginFrom.value);
   }
}