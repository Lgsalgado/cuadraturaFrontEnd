import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import {CuadraturaomsComponent} from "./pages/dashboard/cuadraturaoms/cuadraturaoms.component";
import {PagesComponent} from "./pages/pages.component";


const routes:Routes=[

  {path:'', redirectTo:'/dashboard', pathMatch:'full'},
  {path:'**', component:NopageFoundComponent}
]

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
