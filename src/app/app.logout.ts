import { Component, Injectable } from "@angular/core";
import { Router } from "@angular/router"
import { WindowRef } from './app.windowref';
@Injectable()        
export class LogoutService{
        constructor(private window : WindowRef, private router : Router){

    }
    ngOnInit(){
        this.logout()
    }
    logout(){
        this.window.nativeWindow.localStorage.removeItem("user");
        this.router.navigate(['login']);
    }
}