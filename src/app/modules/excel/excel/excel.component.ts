import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { Observable, Subscriber } from 'rxjs';
import { ConsultaService } from '../../clinica/services/consulta.service';
import { IConsultaExcelTabla } from '../../clinica/interfaces/consulta';
import { time } from 'console';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss']
})
export class ExcelComponent implements OnInit {


  constructor(private consultaService : ExcelService, private consultaService2 : ConsultaService) { }


  ngOnInit(): void {
  }

  exportExcelEndpoint(){
    this.consultaService.exportarExcel().subscribe((data : Blob) => {
      let file = new Blob([data],
         { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
         });
         let fileURL = URL.createObjectURL(file);
         const link =  document.createElement('a');
         link.download = 'pacientes.xls';
         link.href = fileURL;
          link.click();
    });
  }

  download(): void {
    //this.consultaService.downloadExcel();
    this.consultaService2.getConsultaExportExcel().subscribe((response:IConsultaExcelTabla)=>{
      this.consultaService.downloadExcel(response);
    })
  }

}
