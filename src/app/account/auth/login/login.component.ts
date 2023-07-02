import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { UsuarioService } from '../../services/usuario.service';
import { IS_CLAVE } from '../../constans/const';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  storage : Storage = window.localStorage;
  loginForm: FormGroup;
  submitted : boolean = false;
  error = '';
  returnUrl: string;

  type = 'password' ;
  class = 'mdi mdi-eye-outline';
//mdi mdi-eye-off-outline
  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService, private usuarioService : UsuarioService) { }

  ngOnInit() {

   // let token = localStorage.getItem('token');
    //if (token) {
     //  this.router.navigate(['/dashboard']);
    // }

     this.loginForm = this.iniciarFormulario();
    /*
    this.loginForm = this.formBuilder.group({
      email: ['admin@themesbrand.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
    });
      */
    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';





  }

  private iniciarFormulario() {
    return this.formBuilder.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(IS_CLAVE)]],
      remember : [false]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      if (environment.defaultauth === 'firebase') {
        this.authenticationService.login(this.f.email.value, this.f.password.value).then((res: any) => {
          this.router.navigate(['/dashboard']);
        })
          .catch(error => {
            this.error = error ? error : '';
          });
      } else {
        this.authFackservice.login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe(
            data => {
              this.router.navigate(['/dashboard']);
            },
            error => {
              this.error = error ? error : '';
            });
      }
    }
  }

  login(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.usuarioService.login(this.loginForm.value).subscribe(
      (resp)=>{
        if(this.loginForm.get('remember').value){
          localStorage.setItem('email',this.loginForm.get('email').value);
      }else{
        localStorage.removeItem('email');
      }
        this.router.navigate(['/dashboard']);
    },(error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      })
    }
    );

    }

    cambio(){
      if(this.type === 'password'){
        this.type = 'text';
        this.class = 'mdi mdi-eye-off-outline';
      }else{
        this.type = 'password';
        this.class = 'mdi mdi-eye-outline';
      }
    }
  }



