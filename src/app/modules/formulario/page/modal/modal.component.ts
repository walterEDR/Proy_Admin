import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEmpleado } from '../../interface/empleado.interface';
import { EmpleadoService } from '../../services/empleado.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    formEmpleado !: FormGroup;
    @Input() empleado !: IEmpleado;
    @Input() leyenda !: string;



  constructor(private empleadoService : EmpleadoService,
    private fb : FormBuilder,
    private router : Router,
    private modalService: NgbModal ) {
      this.formEmpleado = this.iniciarFormulario();
     }

private iniciarFormulario(){
  return this.fb.group({
    nombre : ['',Validators.required],
    apellido : ['',Validators.required],
    email : ['',Validators.required],
  })
}

guardar(){
  if(this.empleado != null){
  this.editando();
console.log("editando");
} else {
  console.log("registrando");
  this.registrando();
}
}

registrando(){
  this.empleadoService.nuevaEmpleado(this.formEmpleado.value).subscribe((res) => {
    console.log(res);

  });
  this.modalService.dismissAll();
  this.mostrar();
}

  ngOnInit(): void {
    if(typeof this.empleado != 'undefined'){
    this.formEmpleado.patchValue(this.empleado);
    }
  }

  mostrar(){
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);

  }

  editando(){
    console.log("entro en el editar"+ this.empleado)
     this.empleado.nombre = this.formEmpleado.controls['nombre'].value;
     this.empleado.apellido = this.formEmpleado.controls['apellido'].value;
     this.empleado.emial = this.formEmpleado.controls['email'].value;

     this.empleadoService.editarEmpleado(this.empleado).subscribe((resp : any) => {

     });
     this.modalService.dismissAll();
  this.mostrar();
  }

   /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
    this.modalService.open(content);
  }


}
