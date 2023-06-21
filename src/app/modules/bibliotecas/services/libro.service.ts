import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Libro } from '../models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  url = 'http://localhost:8080/api/libros';


  constructor(private http : HttpClient) { }

  agregarLibro(librito : Libro){
    const url = `${this.url}`
    return this.http.post(url, librito);
  }

  editarLibro(librito : Libro){
    const url = `${this.url}/${librito.id}`
    return this.http.put(url, librito);

  }

  borrarLibro(librito : Libro){
    const url = `${this.url}/${librito.id}`
    return this.http.delete(url);

  }



}
