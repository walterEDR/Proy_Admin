import { Libro } from "./libro.model";

export class Biblioteca{
  constructor(
      public nombre : string,
      public id ?: number,
      public libros ?: Libro[]
  ){}
}
