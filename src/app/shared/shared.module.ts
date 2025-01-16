import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AlertComponent } from './components/alert/alert.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CardComponent } from './components/card/card.component';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbTooltipModule,
  NgbModule,
  NgbAccordionModule,
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbProgressbarModule
} from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TblDatatableComponent } from './components/tbl-datatable/tbl-datatable.component';
import { TblSearchingComponent } from './components/tbl-datatable/tbl-searching/tbl-searching.component';
import { DataTablesModule } from 'angular-datatables';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { PipesModule } from './pipes/pipes.module';
import { DatatableModule } from './datatable/datatable.module';
import { FormRenderModule } from './form_render/form_render.module';


const bootstrap = [
  NgbDropdownModule,
  NgbNavModule,
  NgbTooltipModule,
  NgbModule,
  NgbAccordionModule,
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbProgressbarModule,
  NgClickOutsideDirective
];


@NgModule({
  declarations: [
    SpinnerComponent,
    DynamicFormComponent,    
  ],
  imports: [
    AlertComponent,
    BreadcrumbComponent,
    TblSearchingComponent,
    CardComponent,
    CommonModule,
    NgScrollbarModule,
    bootstrap,
    DataTablesModule,
    TblDatatableComponent,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    PipesModule,
    DatatableModule,
    FormRenderModule,
  ],
  exports: [
    AlertComponent,
    BreadcrumbComponent,
    CardComponent,
    CommonModule,
    bootstrap,
    SpinnerComponent,
    NgScrollbarModule,
    NgClickOutsideDirective,
    TblSearchingComponent,
    TblDatatableComponent,
    DynamicFormComponent,
    PipesModule,    
    DatatableModule,
    FormRenderModule,
  ]
})
export class SharedModule { }
