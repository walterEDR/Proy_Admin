import { Component, OnInit } from '@angular/core';
import { IEmpleado } from '../../interface/empleado.interface';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

   empleado : IEmpleado[] = [];
   breadCrumbItems: Array<{}>;

  constructor(private empleadoService : EmpleadoService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Formulario' }, { label: 'Listar', active: true }];
    this.empleado = [];
    this.getEmpleado();
  }

  getEmpleado(){
    this.empleadoService.getEmpleado().subscribe((res) => {
      console.log(res);
      this.empleado = res;
    });
  }

}
