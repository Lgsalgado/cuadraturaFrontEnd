import {Component, Input, OnInit} from '@angular/core';
import {DatePipe, NgFor} from "@angular/common";
import {NgbAlertConfig,NgbAlertModule,NgbDateStruct, NgbCalendar, NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import {orden, SalesforceomsService} from "../../../services/cuadratura/salesforceoms.service";
import {MatTableModule} from "@angular/material/table";
import {NgIconComponent} from "@ng-icons/core";
import {provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroUsers,heroWifi } from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import {CommonModule} from "@angular/common";
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
    CommonModule],
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
    private salesforceService: SalesforceomsService) {
    // customize default values of alerts used by this component tree
    /*this.salesforceService.lista().subscribe((data) => {
      data.map((data: any) => {
        this.solicitud.push(data);
        this.dataSource = this.solicitud;
      });
    });*/
    alertConfig.type = 'success';
    alertConfig.dismissible = false;
  }
  ngOnInit(): void {
    this.model = this.calendar.getToday();
    //console.log(this.model.year)
  }
  //Realizar cuadratura
  view(): void {
    console.log(orden)
    this.salesforceService.lista().subscribe(
      (data) => {
        data.map((data: any) => {
          this.solicitud.push(data);
          this.dataSource = this.solicitud;
        });
        this.solicitud=this.aux;
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
        this.router.navigate([`dashboard/cuadraturaoms/`]);
      }
    );
  }
}
