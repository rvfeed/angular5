import { Injectable } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { WindowRef } from './app.windowref';
@Injectable()
export class CanActivateGaurd implements CanActivate{
    constructor(private w : WindowRef){

    }
  canActivate(){
    console.log(this.w.nativeWindow);
    if(!this.w.nativeWindow.localStorage.getItem("user")){
        return true;
    }
    return true;
  }
}