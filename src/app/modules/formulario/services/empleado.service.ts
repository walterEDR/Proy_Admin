import { Injectable } from '@angular/core';
import { IEmpleado } from '../interface/empleado.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  url = 'http://localhost:8080/empleado';

  empelado : IEmpleado[] = [];

  constructor(private http : HttpClient) { }

  getEmpleado() : Observable<IEmpleado[]> {
    //return this.http.get<IEmpleado[]>(this.url).pipe(map((res:any)=> res.data)) no funciona
    return this.http.get<IEmpleado[]>(`${this.url}/listar`);
  }

  nuevaEmpleado(empleado : IEmpleado) : any{
    console.log(empleado);
    const _url = `${this.url}/agregar`;
    return this.http.post(_url,empleado);
  }

  borrar(p:IEmpleado): any{
    return this.http.delete(`${this.url}/eliminar/${p.id}`)
  }

  editarEmpleado(emp : IEmpleado): any {
    console.log(emp);
    const _url = `${this.url}/editar/${emp.id}`;
    return this.http.put(_url,emp);
  }


  }


