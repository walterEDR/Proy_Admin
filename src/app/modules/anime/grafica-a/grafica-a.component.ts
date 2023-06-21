import { Component, Input, OnInit } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafica-a',
  templateUrl: './grafica-a.component.html',
  styleUrls: ['./grafica-a.component.scss']
})
export class GraficaAComponent implements OnInit {

  @Input() title : string = 'Sin titulo';
  @Input('labels') donaLabels: Label[] = ['label1','label2'];
  @Input('data') donaData: MultiDataSet = [[350,450]];
  @Input('colors') colors:Color[]= [{backgroundColor:['#FFC733','#3FFF33']}];
  constructor() { }

  ngOnInit(): void {
  }

}
