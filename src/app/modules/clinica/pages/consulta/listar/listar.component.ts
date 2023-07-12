import { Component, OnInit } from '@angular/core';
import { IConsulta, IEspecialidad } from '../../../interfaces/consulta';
import { ConsultaService } from '../../../services/consulta.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  consulta : IConsulta[] = [];
  especialidad : IEspecialidad[] = [];
  breadCrumbItems: Array<{}>;
  allConsultas : IConsulta[];

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

  crearPdf(){
    const data = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const content =
    `PACIENTE y MEDICOS CONSULTADOS
    _________________________________________________________________
    `;
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(data, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      const bufferX = 60;
      const bufferY = 60;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX
      const pdfHeight = (imgProps.width * pdfWidth) / imgProps.width;

      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, '', 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.text(content, 10, 10);
      docResult.save(`${new Date().toISOString()}consulta.pdf`);
    });

  }

  pdfMake(){
    this.consultaService.generarPdfMake('PDFMAKE ------ Angular', this.consulta);
  }


}
