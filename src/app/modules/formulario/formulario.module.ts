import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioRoutingModule } from './formulario-routing.module';
import { TableComponent } from './page/table/table.component';
import { ListarComponent } from './page/listar/listar.component';
import { AnimeRoutingModule } from '../anime/anime-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModalComponent } from './page/modal/modal.component';


@NgModule({
  declarations: [
    TableComponent,
    ListarComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormularioRoutingModule,
    AnimeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    UIModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ]
})
export class FormularioModule { }
