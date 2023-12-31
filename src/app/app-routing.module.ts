import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { Page404Component } from './extrapages/page404/page404.component';

const routes: Routes = [
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  // tslint:disable-next-line: max-line-length
  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)}, //
  { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule) }, //canActivate: [AuthGuard]
  { path: 'crypto-ico-landing', component: CyptolandingComponent },
  { path: 'anime', component: LayoutComponent, loadChildren: () => import('./modules/anime/anime.module').then(m => m.AnimeModule) }, //canActivate: [AuthGuard]
  { path: 'formulario', component: LayoutComponent, loadChildren: () => import('./modules/formulario/formulario.module').then(m => m.FormularioModule) }, //canActivate: [AuthGuard]
  { path: 'bibliotecas', component: LayoutComponent, loadChildren: () => import('./modules/bibliotecas/bibliotecas.module').then(m => m.BibliotecasModule) },//canActivate: [AuthGuard]
  { path: 'clinica', component: LayoutComponent, loadChildren: () => import('./modules/clinica/clinica.module').then(m => m.ClinicaModule) },//canActivate
  { path: 'excel', component: LayoutComponent, loadChildren: () => import('./modules/excel/excel.module').then(m => m.ExcelModule) },//canActivate
  { path: '**', component: Page404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
