import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExcelRoutingModule } from './excel-routing.module';
import { ExcelComponent } from './excel/excel.component';
import { FormsModule } from '@angular/forms';
import { Base64Component } from './base64/base64.component';


@NgModule({
  declarations: [
    ExcelComponent,
    Base64Component
  ],
  imports: [
    CommonModule,
    ExcelRoutingModule,
    FormsModule
  ]
})
export class ExcelModule {



}
