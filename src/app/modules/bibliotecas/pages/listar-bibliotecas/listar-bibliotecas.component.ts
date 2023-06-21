import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Biblioteca } from '../../models/biblioteca.model';
import { Libro } from '../../models/libro.model';
import { BibliotecaService } from '../../services/biblioteca.service';
import { LibroService } from '../../services/libro.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-bibliotecas',
  templateUrl: './listar-bibliotecas.component.html',
  styleUrls: ['./listar-bibliotecas.component.scss']
})
export class ListarBibliotecasComponent implements OnInit {

  breadCrumbItems : Array<{}>;

  formLibro!: FormGroup;
  bibliotecas: Array<any> = [];
  bibliotecaSelecionada : Biblioteca = null;
  libros: Array<any>[] = [];
  libroSelecionado : Libro = null;
  cambiarBiblioteca : Biblioteca = null; //biblioteca destino, ppara cambiar libros a otra biblioteca

  submitted : boolean = false;
  ix : number = 0;
  hideme : boolean[] = [];
  checked : boolean = false;

  // para la paginacion
  page: number =0;
  size: number = 10;
  totalElement : number = 0; // total de elementos
  isFirst : boolean  = false; // activar el inicio
  isLast : boolean = false;  // activar el final
  totalPages : Array<number> = []; // total de paginas

  constructor(
    private fb : FormBuilder,
    private bibliotecaService : BibliotecaService,
    private libroService : LibroService,
    private modalService : NgbModal,
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems=[
      {label: "biblioteca"},
      {label: "Lista", active: true}
    ]
    this.mostrarBibliotecas();
    this.initForm();
  }

  initForm(){
    this.formLibro = this.fb.group({
      nombre:['',[Validators.required]],
    });
  }

  mostrarBibliotecas(){
    this.bibliotecaService.biblioteca(this.page, this.size).subscribe((resq : any) => {
      this.bibliotecas = resq.content;
      this.llenarHideme();
      this.totalElement = resq.totalElements;
      this.isFirst = resq.first;
      this.isLast = resq.last;
      this.totalPages = new Array(resq['totalPages']);
    } )
  }

  // metodos de la paginacion
  setPage(page : number): void{
    this.page = page;
    this.mostrarBibliotecas();
  }

  setSize(num : number){
    this.size = num;
    this.mostrarBibliotecas();
  }

  retroceder(){
    if(!this.isFirst){
      this.page--; // para navegar entre paginas
      this.mostrarBibliotecas();
    }
    return this.page;
  }

  adelante(){
    if(!this.isLast){
      this.page++;
      this.mostrarBibliotecas();
    }
    return this.page;
  }

  changeValue(i : any){
    this.hideme[i] = !this.hideme[i];
  }

  llenarHideme(){
      this.bibliotecas.forEach(x => {
        this.hideme.push(true);
      })
  }

  mostrarLibros(biblioteca : Biblioteca, i : number){
    this.mostrarBibliotecas();
    this.changeValue(i);
    this.ix = i;
    this.libros[i] = [];
    this.bibliotecaService.bibliotecaPorId(biblioteca).subscribe((resq : any) => {
      this.libros[i] = resq.libros;
    })
  }

  cambiarAotraBiblioteca(biblioteca : Biblioteca){
    this.cambiarBiblioteca = biblioteca;
  }

  borrar(libro:Libro, i: number){
    Swal.fire({
      title: '¿Esta seguro de eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: 'Cancelar',
    }).then((result) =>{
      if(result.isConfirmed){
        this.libroService.borrarLibro(libro).subscribe(resp => {
          console.log(resp);
          if(!resp){
            this.changeValue(i);
            Swal.fire('Borrado con exito', '', 'success');
          }else{
            Swal.fire('Error hable con el administrador', '', 'warning');
          }
        });
      }else if(result.isDenied){
        Swal.fire('Cambios no aplicados', '', 'info')
      }
    });
  }

  paraAgregar(content : any, biblioteca : Biblioteca, i : number){
    this.initForm();
    this.submitted = false;
    this.bibliotecaSelecionada = biblioteca;
    this.libroSelecionado = null;
    this.ix = i;
    this.modalService.open(content);

  }

  paraEditar(content : any, biblioteca: Biblioteca, libro : Libro,  i : number){

    this.bibliotecaSelecionada = biblioteca;
    this.libroSelecionado = libro;
    this.submitted = false;
    this.formLibro.patchValue(libro);
    this.modalService.open(content);
  }

  guardarLibro(){
    if(this.formLibro.valid){
      if(this.libroSelecionado == null){
        this.registrarLibro();
    }else{
      this.editarLibro();
    }
  }
  this.modalService.dismissAll();
  this.submitted = true;
}

  registrarLibro(){
    const nombre = this.formLibro.get('nombre').value;
    const librito: Libro = new Libro(nombre, this.bibliotecaSelecionada);

    this.libroService.agregarLibro(librito).subscribe(resp=>{
      if(resp){
        Swal.fire({
          position: 'center',
          title: 'Buen Trabajo',
          text: `Datos Guardados con exito`,
          icon: 'info',
        });
        this.changeValue(this.ix);
      }
    },
    (err:any)=>{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Ocurrio un error`,

      });
    });
  }

editarLibro(){

  const nombre = this.formLibro.get('nombre').value;
    this.libroSelecionado.nombre=nombre;
    this.libroSelecionado.biblioteca = this.bibliotecaSelecionada;

    this.libroService.editarLibro(this.libroSelecionado).subscribe(resp =>{
      if(resp){
        Swal.fire({
          position: 'center',
          title: 'Buen Trabajo',
          text: `Datos Guardados con exito`,
          icon: 'info',
        });
        this.changeValue(this.ix);
      }
    }, (err: any) =>{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Ocurrio un error`,
      });
    });

}

trasladarBiblioteca( biblioteca : Biblioteca ){
  let librosACambiar : Libro[] = [];
  for(let x of biblioteca['libros']){
    let element = <HTMLInputElement>document.getElementById(x['id'].toString());
    if(element.checked){
      let obj : Libro = new Libro(x.nombre, this.cambiarBiblioteca, x.id);
      librosACambiar.push(obj);
      this.libroService.editarLibro(obj).subscribe(resp =>{
        Swal.fire({
          position: 'center',
          title: 'Buen Trabajo',
          text: `Datos Guardados con exito`,
          icon: 'info',
        });

      }, (err: any) =>{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Ocurrio al editar el libro ${x.nombre}`,
        });
      } );
    }
  }
  this.changeValue(this.ix);
  this.llenarHideme();
  this.mostrarBibliotecas();
}


  }
