import { Injectable, NgZone, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ILoginUsuario, IRegistroUsuario } from '../interface/auth.interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  storege : Storage = window.localStorage;
  public usuario!: Usuario;
  private http = inject(HttpClient);


  constructor(private router : Router, private ngZone : NgZone) { }

  //---------------------- Crear Usuario ----------------------//
crearUsuario(forData : IRegistroUsuario){

  console.log();
  return this.http.post(`${baseUrl}/usuarios`, forData).pipe(
    tap((resp : any) => {
      this.guardarLocalStorage(resp.token, resp.menu);
    })
  );

}

//---------------------- para guardar en el localstorage ----------------------//
  guardarLocalStorage(token : string, menu : any){
    this.storege.setItem('token', token);

    this.storege.setItem('menu', JSON.stringify(menu));
  }

  //---------------------- para obtener el token del localstorage ----------------------//
  get token(): string{
    return this.storege.getItem('token') || '';
  }

  //---------------------- para autenticar la entrada ----------------------//
  login(formData : ILoginUsuario){
    return this.http.post(`${baseUrl}/login`, formData).pipe(
      tap((resp : any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
        const user = resp;
        return user;
      }),
      catchError((err) => {
        return throwError('Error inesperado');
      })
    );
  }

  logout(){
    this.storege.removeItem('token');
    this.storege.removeItem('menu');
    this.ngZone.run(() => {
      this.router.navigateByUrl('/account/login');
    });
  }

  validarToken() : Observable <boolean>{
    return this.http.get(`${baseUrl}/login/renew`,{
      headers : {
        'x-token': this.token,
      },
    }).pipe(
      map((resp : any) => {
        const {email, google, nombre, role, uid, img} = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        this.guardarLocalStorage(resp.token, resp.menu);
        return true;
      }
    ),
    catchError((err) => of(false))
    );
  }

  get rol() : "ADMIN_ROLE" | "USER_ROLE" | string{
      return this.usuario.rol;
  }

  verificarToken() : boolean{
    return !!this.token;
  }

  async actualizarFoto(archivo : File, tipo : 'usuarios', id : string){
      try {
        const url = `${baseUrl}/upload/${tipo}/${id}`;
        const formData = new FormData();
        formData.append('imagen',archivo);
        const resp = await fetch(url, {
          method: 'PUT',
          headers: {'x-token': localStorage.getItem('token') || ''}, body: formData
        });
        const data = await resp.json();
        if(data.ok){
          return data.nombreArchivo;
        }else{
          return false;
        }
      } catch (error) {
        return false;
      }
  }

}
