import {Component, OnInit} from '@angular/core';
import {SalesforceomsService} from "../../services/cuadratura/salesforceoms.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  constructor() { }
  ngOnInit(): void {
  }
  chart: any;

  chartOptions = {
    theme: "light2",
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "Ordenes Web"
    },
    axisY: {
      labelFormatter: (e: any) => {
        var suffixes = ["", "K", "M", "B", "T"];

        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if(order > suffixes.length - 1)
          order = suffixes.length - 1;

        var suffix = suffixes[order];
        return "$" + (e.value / Math.pow(1000, order)) + suffix;
      }
    },
    data: [{
      type: "line",
      xValueFormatString: "YYYY",
      yValueFormatString: "$#,###.##",
      dataPoints: [
        { x: 1990, y: 2500582120 },
        { x: new Date(1981, 0, 1), y: 2318922620 },
        { x: new Date(1982, 0, 1), y: 2682595570 },
        { x: new Date(1983, 0, 1), y: 3319952630 },
        { x: new Date(1984, 0, 1), y: 3220180980 },
        { x: new Date(1985, 0, 1), y: 4627024630 }

      ]
    }]
  }
}
