import { Component, Input, OnInit } from '@angular/core';
import { IEspecialidad } from '../../../interfaces/consulta';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.scss']
})
export class EspecialidadComponent implements OnInit {
  @Input() consulta !: IEspecialidad[];

  constructor() { }

  ngOnInit(): void {
  }

}
