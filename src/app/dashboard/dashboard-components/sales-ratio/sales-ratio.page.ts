import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid,
  ApexPlotOptions,
  ApexStroke

  // ChartComponent,
  // ApexAxisChartSeries,
  // ApexChart,
  // ApexXAxis,
  // ApexDataLabels,
  // ApexTooltip,
  // ApexStroke
} from 'ng-apexcharts';
import { StorageService } from 'src/app/services/storage.service';
declare var $:any;

export type salesChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  stroke: any;
  theme: ApexTheme | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  markers: any;
  grid: ApexGrid | any;
  plotOptions: ApexPlotOptions | any;
};

@Component({
  selector: 'app-sales-ratio',
  templateUrl: './sales-ratio.page.html',
})
export class SalesRatioPage implements OnInit {

  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public salesChartOptions: Partial<salesChartOptions>;
  constructor() {
    if (StorageService.readStorage("reloadPage")){
      document.location.reload();
      StorageService.deleteStorage("reloadPage")
    }
    this.salesChartOptions = {
      series: [
        {
          name: "serie1",
          data: [31, 40, 28, 51, 42, 109, 100, 110]
        },
        {
          name: "serie2",
          data: [11, 32, 45, 32, 34, 52, 41, 55]
        }
      ],
      chart: {
        fontFamily: 'Montserrat,sans-serif',
        height: 290,
        type: 'area',
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#0d6efd", "#009efb", "#6771dc"],
      stroke: {
        show: true,
        width: 4,
        colors: ["transparent"],
      },
      grid: {
        strokeDashArray: 3,
      },
      xaxis: {
        categories: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
        ],
      },
      tooltip: {
        theme: 'dark'
      }
    };
  }

  ngOnInit() {
  }

}
