import { Component, Input, OnInit } from '@angular/core';
import { IEmpleado } from '../../interface/empleado.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() empleado !: IEmpleado[];
  p : any;
  emp : IEmpleado ;

  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
  }

  openModal() {
    this.modalService.open( { centered: true });
  }

}
