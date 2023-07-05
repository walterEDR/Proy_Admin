import { Component, OnInit } from '@angular/core';
import { IConsulta, IEspecialidad } from '../../../interfaces/consulta';
import { ConsultaService } from '../../../services/consulta.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  consulta : IConsulta[] = [];
  especialidad : IEspecialidad[] = [];
  breadCrumbItems: Array<{}>;

  constructor(private consultaService : ConsultaService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Formulario' }, { label: 'Listar', active: true }];
    this.consulta = [];
    this.especialidad = [];
    this.getConsulta();
    this.getConsultaEspecialidad();
  }

  getConsulta(){
    this.consultaService.getConsulta().subscribe((res) => {
      console.log(res);
      this.consulta = res;
    });
  }

  getConsultaEspecialidad(){
    this.consultaService.getEspecialidad().subscribe((res) => {
      console.log(res);
      this.especialidad = res;
    });
  }

  descargarPdf(){
    this.consultaService.generarConsultaPdf().subscribe((data : Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'consultaMedicaPorEspecialidad.pdf';
      link.click();
    });
  }

  generarConsultaPdf(){
    this.consultaService.generarConsultaPdf().subscribe((resp : Blob) => {
      const file = new Blob([resp], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

}
