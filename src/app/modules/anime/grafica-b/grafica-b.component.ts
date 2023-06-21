import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartType } from './apex.model';

import {
  linewithDataChart, basicColumChart, columnlabelChart, lineColumAreaChart,
  basicRadialBarChart, simplePieChart, donutChart, barChart, splineAreaChart, dashedLineChart
} from './data';
import { ChartOptions } from './chart-type';
import { ChartComponent } from 'ng-apexcharts';


@Component({
  selector: 'app-grafica-b',
  templateUrl: './grafica-b.component.html',
  styleUrls: ['./grafica-b.component.scss']
})
export class GraficaBComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent;
  @Input('data') chartOptions : Partial<ChartOptions> = {
    series : [
      {
        name : "My-series",
        data : [10,41,35]
      }
    ],
    chart : {
      height : 350,
      type : "line"
    },
    title : {
      text : "My First Angular Chart"
    },
    xaxis :{
      categories : ["Jan", "Feb","Mar", "Apr","May","Jun", "Jul", "Aug","Sep"]
    }
  };

  @Input() title : string = 'Sin titulo';



  constructor() { }

  ngOnInit(): void {

  }



}
