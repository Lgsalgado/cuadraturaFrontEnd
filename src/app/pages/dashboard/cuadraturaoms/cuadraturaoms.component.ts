import {Component, Input, OnInit} from '@angular/core';
import {DatePipe, NgFor} from "@angular/common";
import {NgbAlertConfig,NgbAlertModule,NgbDateStruct, NgbCalendar, NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import {SalesforceomsService} from "../../../services/cuadratura/salesforceoms.service";
import {MatTableModule} from "@angular/material/table";
export interface Solicitud {
  id: number;
  username: string;
  name: string;
  email: string;
}
@Component({
  selector: 'app-cuadraturaoms',
  standalone: true,
  templateUrl: './cuadraturaoms.component.html',
  imports: [NgFor, NgbAlertModule,
    NgbDatepickerModule, FormsModule, JsonPipe, DatePipe, MatTableModule],
  styleUrls: ['./cuadraturaoms.component.scss'],
  providers: [NgbAlertConfig],
})
export class CuadraturaomsComponent implements OnInit
{
  displayedColumns: string[] = [
    'id',
    'user',
    'name',
    'email',
  ];

  solicitud: Solicitud[] = [];
  solicitud2: Solicitud[] = [];
  dataSource: any;
  dataSource2: any;
  model: NgbDateStruct | undefined;
  date: { year: number; month: number; } | undefined;

  @Input() public alerts: Array<string> = [];

  constructor(
    alertConfig: NgbAlertConfig,
    private calendar: NgbCalendar,
    private salesforceService: SalesforceomsService) {
    // customize default values of alerts used by this component tree
    this.salesforceService.lista().subscribe((data) => {
      data.map((data: any) => {
        this.solicitud.push(data);
        this.dataSource = this.solicitud;
      });
    });
    this.salesforceService.listaProductos().subscribe((data) => {
      data.map((data: any) => {
        this.solicitud2.push(data);
        this.dataSource2 = this.solicitud2;
        console.log(this.dataSource2)
      });
    });
    alertConfig.type = 'success';
    alertConfig.dismissible = false;
  }
  ngOnInit(): void {}
  selectToday() {
    this.model = this.calendar.getToday();
  }
}


