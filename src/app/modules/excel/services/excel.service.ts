import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagePosition, Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { Column } from 'ng2-smart-table/lib/lib/data-set/column';
import { logo } from '../constant/logo';
import { IConsultaExcelTabla, ITablaConsulta } from '../../clinica/interfaces/consulta';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  url = 'http://localhost:8080';

  private workbook !: Workbook;

  constructor(private http : HttpClient) { }

  exportarExcel() : Observable<Blob> {
    const endpoint = `${this.url}/paciente/excel`;
    return this.http.get(endpoint, {responseType : 'blob'});
  }

    downloadExcel(dataExcel : IConsultaExcelTabla){
    this.workbook = new Workbook();
    this.workbook.creator = 'cursoAngular';
   // this.workbook.addWorksheet('CONSULTAS');
 //  console.table(dataExcel.tablaConsulta)
     this.crearTablaConsulta(dataExcel.tablaConsulta);
    this.workbook.xlsx.writeBuffer().then((data) =>{
      const blob = new Blob([data]);
      fs(blob, 'consulta.xlsx');
    } )

  }
/*
  crearTablaConsulta(dataConsultaTable: ITablaConsulta[]){
    const sheet = this.workbook.addWorksheet('CONSULTA');

    sheet.getColumn("B").width = 5;
    sheet.getColumn("C").width = 15;
    sheet.getColumn("D").width = 12;
    sheet.getColumn("E").width = 15;
    sheet.getColumn("F").width = 40;
    sheet.getColumn("G").width = 40;
    sheet.getColumn("H").width = 8 ;

    //para agregar estilo un general para todas las columnas

    sheet.columns.forEach((column) => {
      column.alignment = { vertical :'middle', wrapText:true};
    });

    // se adiciona el logo

    const logoId = this.workbook.addImage({
      base64 : logo,
      extension : 'png',
    });

    // ubicacion de la imagen

    const position : ImagePosition = {
      tl : {col: 1.4, row : 1.2},
      ext : {width : 128, height : 128},
    }

    sheet.addImage(logoId,position);

    //agregar valor al titulo
    sheet.mergeCells('D5','G5');
    const titulo = sheet.getCell('D5');
    titulo.value = 'INFORMACION DE CONSULTA MEDICAS';

    titulo.style.font = {
      bold : true,
      size: 25,
      name: 'Antique Olive',
      underline: 'single',
      color: {
        argb : '660099'
      }
    };

    titulo.alignment = {
      vertical : 'middle',
      horizontal : 'center',
      wrapText: false
    }
  /// Agregando fecha de generacion de reporte
    const data = new Date();
    const fechaFormato = `${data.getDate()} / ${data.getMonth()+1} / ${data.getFullYear()}`;
    const celdaFecha = sheet.getCell('F6')
    celdaFecha.value = fechaFormato;
    celdaFecha.font = {
      name : 'Aria Nova',
      size : 12,
      bold : true
    }
    celdaFecha.alignment = {
      vertical : 'middle',
      horizontal : 'center',
      wrapText : false
    };
    //Encabezado a la tabla
    const headerR = sheet.getRow(10);
    headerR.values = [
      ' ', // column A,
      'N', // column B
      'Fecha', // column C
      'Consultorio', // column D
      'Especialidad', // column E
      'Paciente',  // column F
      'Medico' // column G
    ];
    //Formato al encabezado
    headerR.alignment = { vertical : 'middle', wrapText: false};
    ['B','C','D','E','F','G','H'].forEach((columnKey) => {
      sheet.getCell(`${columnKey}10`).font = {
        bold: true,
        color: { argb: 'FFFFFF'},
        size: 12,
        italic: true,
      };
      sheet.getCell(`${columnKey}10`).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '000000'},
        bgColor: { argb: ''},
      }
    });

    //insertando Datos
    const filasInsertar = sheet.getRows(11,dataConsultaTable.length)!;
/*
    for (let index = 0 ; index < filasInsertar.length; index++){
      const itemData = dataConsultaTable[index];
      console.table(itemData)
      const row = filasInsertar[index];
      row.values = [
        '', // columno A
        `${index + 1}`,  // columno B
       `${itemData.fechaConsulta}`,  // columno C

        `${itemData.numConsultorio}`,  // columno D
        `${itemData.especialidad}`,  // columno E
        `${itemData.paciente}`,   // columno F
        `${itemData.medico}`,  // columno G
      ]
    }


    for (let index = 0; index < filasInsertar.length; index++) {
      const itemData = dataConsultaTable[index];
      const row = filasInsertar[index];
      row.values = [
        "",
        `${index + 1}`,
        `${itemData.fechaConsulta}`,
        `${itemData.numConsultorio}`,
        `${itemData.especialidad}`,
        `${itemData.paciente}`,
        `${itemData.medico}`,
      ];

  }

  }
*/


private async crearTablaConsulta(dataConsultaTable: ITablaConsulta[]) {
  const sheet = this.workbook.addWorksheet("CONSULTAS");

  sheet.getColumn("B").width = 5;
  sheet.getColumn("C").width = 15;
  sheet.getColumn("D").width = 12;
  sheet.getColumn("E").width = 15;
  sheet.getColumn("F").width = 40;
  sheet.getColumn("G").width = 40;
  sheet.getColumn("H").width = 8;

  sheet.columns.forEach((column) => {
    column.alignment = { vertical: "middle", wrapText: true };
  });

  const logoId = this.workbook.addImage({
    base64: logo,
    extension: "png",
  });

  const position: ImagePosition = {
    tl: { col: 1.4, row: 1.2 },
    ext: { width: 128, height: 128 },
  };

  sheet.addImage(logoId, position);

  sheet.mergeCells("D5", "G5");

  const titulo = sheet.getCell("D5");
  titulo.value = "INFORMACIÓN DE CONSULTAS MÉDICAS";

  titulo.style.font = {
    bold: true,
    size: 25,
    name: "Antique Olive",
    underline: "single",
    color: {
      argb: "660099",
    },
  };

  titulo.alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: false,
  };

  const date = new Date();
  const fechaFormato = `${date.getDate()} / ${date.getMonth() + 1
    } / ${date.getFullYear()}`;
  const celdaFecha = sheet.getCell("F6");
  celdaFecha.value = fechaFormato;
  celdaFecha.font = {
    name: "Arial Nova",
    size: 12,
    bold: true,
  };
  celdaFecha.alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: false,
  };
  //nombre en las columnas
  const headerR = sheet.getRow(10);
  headerR.values = [
    " ",
    "N.",
    "Fecha",
    "Consultorio",
    "Especialidad",
    "Paciente",
    "Medico",
  ];

  //estilo a las celdas de cabecera
  headerR.alignment = { vertical: "middle", wrapText: false };

  ["B", "C", "D", "E", "F", "G", "H"].forEach((columnKey) => {
    sheet.getCell(`${columnKey}10`).font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
      italic: true,
    };
    sheet.getCell(`${columnKey}10`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "000000" },
      bgColor: { argb: "" },
    };
  });

  const filasInsertar = sheet.getRows(11, dataConsultaTable.length)!;
  for (let index = 0; index < filasInsertar.length; index++) {
    const itemData  = dataConsultaTable[index];
    const row = filasInsertar[index];
    row.values = [
      "",
      `${index + 1}`,
      `${itemData.fechaConsulta}`,
      `${itemData.numConsultorio}`,
      `${itemData.especialidad}`,
      `${itemData.paciente}`,
      `${itemData.medico}`,
    ];


    //para bordes a las celdas
    let fila = 11 + index;
    ["B", "C", "D", "E", "F", "G", "H"].forEach((columnKey) => {
      sheet.getCell(`${columnKey}${fila}`).border = {
        top: { style: 'double', color: { argb: '000' } },
        left: { style: 'double', color: { argb: '000' } },
        right: { style: 'double', color: { argb: '000' } },
        bottom: { style: 'double', color: { argb: '000' } }
      }
    })

    /*
    const idImage = await this.getIdImage("/assets/images/users/no-image.png");
    sheet.addImage(idImage, {
      tl: { col: 7, row: row.number - 1 },
      ext: { width: 50, height: 50 },
    });
    row.height = 55;
*/


  }

}


private async getIdImage(url: string): Promise<number> {
  const response = await fetch(url);
  const image = this.workbook.addImage({
    buffer: await response.arrayBuffer(),
    extension: "png",
  });
  return image;
}


}
