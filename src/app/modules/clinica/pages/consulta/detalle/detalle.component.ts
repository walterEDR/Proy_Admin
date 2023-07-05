import { Component, Input, OnInit } from '@angular/core';
import { IConsulta } from '../../../interfaces/consulta';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  @Input() consulta !: IConsulta[];

  constructor() { }

  ngOnInit(): void {
  }

}
