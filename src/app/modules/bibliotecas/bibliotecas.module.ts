import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibliotecasRoutingModule } from './bibliotecas-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { ListarBibliotecasComponent } from './pages/listar-bibliotecas/listar-bibliotecas.component';


@NgModule({
  declarations: [
    ListarBibliotecasComponent
  ],
  imports: [
    CommonModule,
    BibliotecasRoutingModule,
    HttpClientModule,
    NgbModalModule,
    ReactiveFormsModule,
    UIModule, // para las migajas
    NgbModule, // para la tabla
    FormsModule,
  ]
})
export class BibliotecasModule { }
