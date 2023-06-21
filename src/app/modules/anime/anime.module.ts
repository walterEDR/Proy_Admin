import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimeRoutingModule } from './anime-routing.module';
import { CardComponent } from './card/card.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ListarComponent } from './pages/listar/listar.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TablaComponent } from './pages/tabla/tabla.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
//import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { GraficaAComponent } from './grafica-a/grafica-a.component';
import { GraficaBComponent } from './grafica-b/grafica-b.component';


@NgModule({
  declarations: [
    CardComponent,
    ListarComponent,
    BuscarComponent,
    TablaComponent,
    MostrarComponent,
    GraficaAComponent,
    GraficaBComponent
  ],
  imports: [
    CommonModule,
    AnimeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    UIModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgApexchartsModule,
    ChartsModule,
  ]
})
export class AnimeModule { }
