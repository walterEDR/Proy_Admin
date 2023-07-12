import { Injectable } from '@angular/core';
import { IConsulta, IConsultaExcelTabla, IEspecialidad, ITablaConsulta } from '../interfaces/consulta';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Img, PdfMakeWrapper, Txt, Table, Item} from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"
import { map } from 'rxjs/operators';
PdfMakeWrapper.setFonts(pdfFonts);

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  url = 'http://localhost:8080';


  cosnulta : IConsulta[] = [];

  espepcialidad : IConsulta[] = [];

  constructor(private http : HttpClient) { }

  getConsulta() : Observable<IConsulta[]> {

  return this.http.get<IConsulta[]>(`${this.url}/consulta`);

}

  getEspecialidad() : Observable<IEspecialidad[]> {
    return this.http.get<IEspecialidad[]>(`${this.url}/especialidad`);
  }

  generarConsultaPdf() {
    const httpOptions = { responseType : 'arraybuffer' as 'json' }; // convertir la respesta en formato json
    return this.http.get(`${this.url}/consulta/pdf`, httpOptions);
  }

  async generarPdfMake(titulo : string, data : IConsulta[] ) {
      const pdf = new PdfMakeWrapper();
      pdf.add(new Txt(`${titulo}`).alignment('right').italics().margin(10).end);
      pdf.add(new Txt('REPORTE DE CONSULTAS').color('blue').fontSize(18).bold().alignment('center').end);
      pdf.add(new Txt(' ').end);
     //  pdf.add(await new Img('assets/img/users/no-image.png').height(50).width(50).absolutePosition(60,40).build());
      pdf.add(new Txt(' ').end);
      pdf.add(new Txt('CONSULTAS:').margin(15).bold().decoration('underline').end);
      pdf.add(new Txt(' ').margin(15).end);
      pdf.add(new Table([['','Paciente','Medico','Especialidad','Fecha']])
      .alignment('center').widths([20,200,200,150,100]).fontSize(12).italics().bold().layout('lightHorizontalLines').end);
      for(let x of data) {
        pdf.add(new Table([
          ['','','','',''],
          ['',`${x.paciente.nombrePaciente} ${x.paciente.apellidoPaciente}`,`${x.medico.nombreMedico} ${x.medico.apellidoMedico},
          ${x.especialidad.nombreEspeciadad}, ${x.fechaConsulta}`]
        ]).widths([20,200,200,150,100]).fontSize(10).layout('lightHorizontalLines').end);
      }
      pdf.add(new Txt(' ').margin(20).end);
      pdf.add(new Txt('F._________________').alignment('right').end);
      pdf.footer(new Txt(' ' + new Date()).alignment('left').italics().margin(10).end);
      pdf.pageOrientation('landscape');
      pdf.create().open();
  }

  getConsultaExportExcel(): Observable<IConsultaExcelTabla>{
    return this.http.get<IConsulta[]>(this.url + `/consulta`).pipe(
      map((resp:IConsulta[]) => {
        resp.length = 5;
        const dataExcel : IConsultaExcelTabla = {
          tablaConsulta : this.getConsultaTabla(resp)
        };
        return dataExcel;
      })
    )
  }

  private getConsultaTabla(response : IConsulta[]): ITablaConsulta[]{
    return response.map((item:IConsulta) => ({
      fechaConsulta : `${item.fechaConsulta}`,
      numConsultorio: `${item.numConsultorio}`,
      especialidad : `${item.especialidad.nombreEspeciadad}`,
      paciente : `${item.paciente.nombrePaciente} ${item.paciente.apellidoPaciente}`,
      medico : `${item.medico.nombreMedico} ${item.medico.apellidoMedico} `
    }));
  }

  

}
