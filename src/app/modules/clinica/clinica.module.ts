import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicaRoutingModule } from './clinica-routing.module';
import { ListarComponent } from './pages/consulta/listar/listar.component';
import { DetalleComponent } from './pages/consulta/detalle/detalle.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EspecialidadComponent } from './pages/consulta/especialidad/especialidad.component';


@NgModule({
  declarations: [
    ListarComponent,
    DetalleComponent,
    EspecialidadComponent
  ],
  imports: [
    CommonModule,
    ClinicaRoutingModule,
    UIModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ]
})
export class ClinicaModule { }
