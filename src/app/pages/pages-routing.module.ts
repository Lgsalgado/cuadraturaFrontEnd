import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {CuadraturaomsComponent} from "./dashboard/cuadraturaoms/cuadraturaoms.component";
import {FacturadorComponent} from "./dashboard/facturador/facturador.component";

const routes:Routes=[
  {path:'dashboard', component:PagesComponent,
    children:[
      {path:'', component:DashboardComponent},
      {path:'usuarios', component:UsuariosComponent},
      {path:'cuadraturaoms', component:CuadraturaomsComponent},
      {path:'facturador', component:FacturadorComponent}

    ]
  },

]

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
