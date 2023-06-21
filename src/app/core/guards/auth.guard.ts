import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/account/services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private authFackservice: AuthfakeauthenticationService,
        private usuarioService : UsuarioService,
    ) { }


    /*
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (environment.defaultauth === 'firebase') {
            const currentUser = this.authenticationService.currentUser();
            if (currentUser) {
                // logged in so return true
                return true;
            }
        } else {
            const currentUser = this.authFackservice.currentUserValue;
            if (currentUser) {
                // logged in so return true
                return true;
            }
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
*/
    canActivate() : Observable <boolean> | boolean {
        return this.usuarioService.validarToken().pipe(
          tap(isAuth => {
            if(!isAuth){
              this.router.navigateByUrl('/account/login');
            }
          })
        );
    }

    canLoad() : Observable <boolean> | boolean{
        return this.usuarioService.validarToken().pipe(
          tap(isAuth => {
            if(!isAuth){
              this.router.navigateByUrl('/account/login');
            }
          })
        );
    }

}
