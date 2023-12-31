// Generated by https://quicktype.io

export interface IConsulta {
  idConsulta:      number;
  paciente:        IPaciente;
  medico:          IMedico;
  especialidad:    IEspecialidad;
  numConsultorio:  string;
  fechaConsulta?:  string;
  detalleConsulta: IDetalleConsulta[];
  horaConsulta:    string;
}

export interface IDetalleConsulta {
  idDetalleConsulta: number;
  diagnostico:       string;
  tratamiento:       string;
  examenes:          IExamene[];
}

export interface IExamene {
  idExamen:     number;
  nombreExamen: string;
  lectura:      string;
}

export interface IEspecialidad {
  idEspecialidad:   number;
  nombreEspeciadad: string;
}

export interface IMedico {
  idMedico:       number;
  nombreMedico:   string;
  apellidoMedico: string;
  jvpm:           string;
}

export interface IPaciente {
  idPaciente:        number;
  nombrePaciente:    string;
  apellidoPaciente:  string;
  identPaciente:     string;
  direccionPaciente: string;
}

export interface IConsultaExcelTabla{
  tablaConsulta: ITablaConsulta[];
}

export  interface ITablaConsulta{
  fechaConsulta: string;
  numConsultorio: string;
  especialidad: string;
  paciente: string;
  medico: string;
}
