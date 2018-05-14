import { Component } from "@angular/core";
import { Router } from "@angular/router"
import { WindowRef } from './app.windowref';
@Component({
  selector: 'app-header',
  template: `
<nav class="navbar navbar-light bg-faded">
  <a class="navbar-brand" href="#">Welcome to Forex Exchange</a>
  <ul class="nav navbar-nav">
    <li class="nav-item active">
      <a class="nav-link" routerLink="/home">Home</a>
      </li>
      <li class="nav-item">
      <a class="nav-link" routerLink="/lazy">lazy</a>
      </li>
      <li class="nav-item">
      <a class="nav-link" routerLink="/postComment">Post</a>      
    </li>
    <li class="nav-item">
      <a class="nav-link" (click) = "logout()">logout</a>
    </li>
  </ul>
</nav>
 `,
 providers: [WindowRef]
})
export class HeaderComponent {
        constructor(private window : WindowRef, private router : Router){
    }
    logout(){
        this.window.nativeWindow.sessionStorage.removeItem("user");
        this.router.navigate(['login']);
    }
}
