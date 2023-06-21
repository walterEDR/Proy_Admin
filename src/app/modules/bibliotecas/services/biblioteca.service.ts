import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Biblioteca } from '../models/biblioteca.model';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

  url = 'http://localhost:8080/api/biblioteca';

  constructor(private http : HttpClient) { }

  public biblioteca(page : number, size : number): Observable<any>{
    return this.http.get<any>(this.url + '?' + `page=${page}&size=${size}`);

  }

  public bibliotecaPorId(biblioteca : Biblioteca) : Observable<any>{
    return this.http.get<any>(this.url + '/' + `${biblioteca.id}`);

  }

}
