import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarBibliotecasComponent } from './pages/listar-bibliotecas/listar-bibliotecas.component';

const routes: Routes = [
  {path: 'listar', component: ListarBibliotecasComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BibliotecasRoutingModule { }
