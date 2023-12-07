import {Component, Input, OnInit} from '@angular/core';
import {DatePipe, NgFor} from "@angular/common";
import {NgbAlertConfig,NgbAlertModule,NgbDateStruct, NgbCalendar, NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { JsonPipe } from '@angular/common';

import {FacturadorService} from "../../../services/facturador/facturador.service";
import {MatTableModule} from "@angular/material/table";
import {NgIconComponent} from "@ng-icons/core";
import {provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroUsers,heroWifi } from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../../services/session/auth.service";
import {TokenService} from "../../../services/session/token.service";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {SalesforceomsService} from "../../../services/cuadratura/salesforceoms.service";

export interface Solicitud {
  id: number;
  username: string;
  name: string;
  email: string;
}
@Component({
  selector: 'app-facturador',
  standalone: true,
  templateUrl: './facturador.component.html',
  styleUrls: ['./facturador.component.scss'],
  imports: [NgFor, NgbAlertModule,
    NgbDatepickerModule,
    FormsModule,
    JsonPipe,
    DatePipe,
    MatTableModule,
    NgIconComponent,
    CommonModule, MatInputModule],
  providers: [NgbAlertConfig],
  viewProviders: [provideIcons({ featherAirplay, heroUsers,heroWifi})]
})

export class FacturadorComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'user',
    'name',
    'email',
    'actionsColumn'
  ];
  solicitudForm: FormGroup;

  solicitud: Solicitud[] = [];
  dataSource: any;

  aux:any;
  model: NgbDateStruct | undefined;
  date: { year: number; month: number; } | undefined;
  err: any;

  @Input() public alerts: Array<string> = [];

  constructor(
    alertConfig: NgbAlertConfig,
    public router: Router,
    private calendar: NgbCalendar,
    private facturadorService: FacturadorService,
    private salesforceService : SalesforceomsService,
    private token: TokenService,
    private fb: FormBuilder) {
    this.solicitudForm = this.fb.group({
      salesforce: ['', [Validators.required]],
      oms: ['', [Validators.required]],
    });
    alertConfig.type = 'success';
    alertConfig.dismissible = false;
  }
  ngOnInit(): void {
    this.model = this.calendar.getToday();
    //console.log(this.model.year)
  }
  //Realizar cuadratura
  login(): void {

    this.facturadorService.sesion().subscribe(
      (data) => {
        this.responseHandler(data);
      },
      (error) => {
        this.err = error;
        Swal.fire({
          title: 'Error!',
          text: this.err.message+" status: "+this.err.status,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })

      },
      () => {
        this.router.navigate([`dashboard/facturador/`]);
      }
    );
  }
  //Ordenes con error en un rango de fecha
  error(): void {

    this.facturadorService.errores().subscribe(
      (data) => {
        console.log(data)
      },
      (error) => {
        this.err = error;
        Swal.fire({
          title: 'Error!',
          text: this.err.message+" status: "+this.err.status,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })

      },
      () => {
        this.router.navigate([`dashboard/facturador/`]);
      }
    );
  }


  onFileSelect(e: any) {
    console.log('test');
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.solicitudForm.controls['salesforce'].setValue(file);
    }else {
      Swal.fire(
        'No existe archivo adjunto'
      )
    }
  }
  onFileSelect1(e: any) {
    console.log('test');
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.solicitudForm.controls['oms'].setValue(file);
    }else {
      Swal.fire(
        'No existe archivo adjunto'
      )
    }
  }

  responseHandler(jwt: { token: string }) {
    this.token.handleData(jwt.token);
  }
}
