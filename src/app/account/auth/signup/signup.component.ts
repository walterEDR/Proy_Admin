import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { UserProfileService } from '../../../core/services/user.service';
import { UsuarioService } from '../../services/usuario.service';
import { IS_CLAVE, IS_EMAIL, IS_NAME } from '../../constans/const';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted : boolean = false;
  error : string = '';
  successmsg : boolean = false;

  // set the currenr year
  year: number = new Date().getFullYear();



  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private userService: UserProfileService, private usuarioService : UsuarioService) { }

  ngOnInit() {
    /*
    this.signupForm = this.formBuilder.group({
    //  username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    */
   this.iniciarFormulario();
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {
      if (environment.defaultauth === 'firebase') {
        this.authenticationService.register(this.f.email.value, this.f.password.value).then((res: any) => {
          this.successmsg = true;
          if (this.successmsg) {
            this.router.navigate(['/dashboard']);
          }
        })
          .catch(error => {
            this.error = error ? error : '';
          });
      } else {
        this.userService.register(this.signupForm.value)
          .pipe(first())
          .subscribe(
            data => {
              this.successmsg = true;
              if (this.successmsg) {
                this.router.navigate(['/account/login']);
              }
            },
            error => {
              this.error = error ? error : '';
            });
      }
    }
  }

  private iniciarFormulario():void{
    this.signupForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(IS_NAME)]],
      email : ['', [Validators.required, Validators.pattern(IS_EMAIL)]],
      password : ['', [Validators.required, Validators.minLength(6), Validators.pattern(IS_CLAVE)]],
      confirmarPassword : ['', [Validators.required]]
    },{
      validators : this.claveSonIguales('password', 'confirmarPassword')
    });
  }

claveSonIguales(pass1 : string, pass2 : string){
  return (FormGroup : FormGroup) => {
    const password = FormGroup.controls[pass1];
    const confirnPassword = FormGroup.controls[pass2];
    if (password.value === confirnPassword?.value) {
        confirnPassword?.setErrors(null);
    }else{
      confirnPassword?.setErrors({noEsIgual : true});
    }
  }
}

crearUsuario(){
  this.submitted = true;
  if (this.signupForm.valid) {
      this.usuarioService.crearUsuario(this.signupForm.value).subscribe(resp => {
        this.router.navigate(['/account/login']);
        Swal.fire({
          title: 'Usuario creado',
          icon: 'success',
          position : 'top-end',
          showConfirmButton: false,
          timer: 1500
        });
      }, (err) => {
        Swal.fire({
          title: 'Error al crear usuario',
          icon: 'error',
          position : 'top-end',
          text : err,
          showConfirmButton: false,

        });
      });
  }else{
    Swal.fire({
      title: 'Error al crear usuario',
      icon: 'error',
      position : 'top-end',
      showConfirmButton: false,

    });
  }

  }


}



