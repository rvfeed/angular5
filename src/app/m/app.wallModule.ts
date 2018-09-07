import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { WallComponent } from './wall/wall.component';
import {StoreModule } from "@ngrx/store";
import {EffectsModule} from '@ngrx/effects';
import { HttpClientModule} from '@angular/common/http'
import {DbModal} from './services/app.mongodb'
const routes: Routes = [
  { path: 'wall', component: WallComponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [DbModal],
  declarations: [WallComponent]
})
export class AdminModule { }
