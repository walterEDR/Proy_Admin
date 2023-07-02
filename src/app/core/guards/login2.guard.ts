import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/account/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class Login2Guard implements CanActivate {

  constructor(private usuarioService : UsuarioService, private route : Router){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
if (this.usuarioService.validarToken()) {
  this.route.navigate(['/dashboard']);
    return true;
} else {
  this.route.navigate(['/account/login']);
    return false;
}

  }
/*


const token = this.usurioService.token

if(token !== ''){
  return this.usuarioService.validarToken().pipe(
    tap(isAuth)
  )
}
*/
}
