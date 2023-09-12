import {Component, Input, OnInit} from '@angular/core';
import {NgFor} from "@angular/common";
import {NgbAlertConfig,NgbAlertModule,NgbDateStruct, NgbCalendar, NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-cuadraturaoms',
  standalone: true,
  templateUrl: './cuadraturaoms.component.html',
  imports: [NgFor, NgbAlertModule,
    NgbDatepickerModule, FormsModule, JsonPipe],
  styleUrls: ['./cuadraturaoms.component.scss'],
  providers: [NgbAlertConfig],
})
export class CuadraturaomsComponent
{
  model: NgbDateStruct | undefined;
  date: { year: number; month: number; } | undefined;

  @Input() public alerts: Array<string> = [];

  constructor(alertConfig: NgbAlertConfig,private calendar: NgbCalendar) {
    // customize default values of alerts used by this component tree
    alertConfig.type = 'success';
    alertConfig.dismissible = false;
  }
  selectToday() {
    this.model = this.calendar.getToday();
  }
}


