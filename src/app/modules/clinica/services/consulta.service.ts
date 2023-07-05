import { Injectable } from '@angular/core';
import { IConsulta, IEspecialidad } from '../interfaces/consulta';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

}
