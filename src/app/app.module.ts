import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http'
import { AppComponent } from './component/app.component';
import { AppWeatherComponent } from './weather/app.weather';
import { LoginComponent } from './app.login';
import { RegisterComponent } from './registration/app.register';
import { DefaultComponent } from './app.default';
import { WindowRef } from './app.windowref';
import { HeaderComponent } from './app.header';
import { CanActivateGaurd } from "./app.lib";
import { NestedComponent } from './nested/nested.component';
import { InnerComponent } from './inner/inner.component';
import { UserComponent } from './user/user.component';
import { CommService } from './comm.service';
import { AppGetcurrenciesService } from './app.getcurrencies.service';
import { ModuleWithProviders } from '@angular/core';
import 'core-js/es7/reflect';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SearchPipe } from './search.pipe';
import { PheonixComponent } from './pheonix/pheonix.component';
import { CompanyComponent } from './pheonix/company/company.component';
import { CompantdetailsComponent } from './pheonix/company/compantdetails/compantdetails.component';
import { PostComponent } from './post/post.component';
import { WallComponent } from './wall/wall.component';
import { CommentComponent } from './comment/comment.component';
//import { LogoutComponent } from './app.logout';


const routes : Routes = [
                        { path: '', redirectTo : 'login', pathMatch : 'full'  },
                        { path: 'login', component: LoginComponent },
                        { path: 'home', component: AppComponent, canActivate: [ CanActivateGaurd ],
                        children: [
                          { path: 'enterData', component: CompanyComponent },
                          { path: 'showData', component: CompantdetailsComponent }
                        ] },
                        { path: 'postComment', component: PostComponent },                        
                        { path: 'register', component: RegisterComponent },                                              
                        { path: 'lazy', loadChildren: 'app/lazy/lazy.module#LazyModule' }
                      ]
const routing: ModuleWithProviders = RouterModule.forRoot(routes);
@NgModule({
  declarations: [
    AppComponent,
    AppWeatherComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    HeaderComponent,
    NestedComponent,
    InnerComponent,
    UserComponent,
    DropdownComponent,
    SearchPipe,
    PheonixComponent,
    CompanyComponent,
    CompantdetailsComponent,
    PostComponent,
    WallComponent,
    CommentComponent     
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [HttpClient, WindowRef, CanActivateGaurd, CommService, AppGetcurrenciesService],
  bootstrap: [DefaultComponent]
})
export class AppModule { }
