import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRenderComponent } from './form_render.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgbTooltipModule, NgbDatepickerModule, NgbDateNativeAdapter, NgbDateAdapter, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [FormRenderComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    NgbTooltipModule,
    NgxFileDropModule,
    PipesModule,
    NgbDatepickerModule,
    NgbModalModule,
  ],
  exports: [FormRenderComponent],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
  ],
})
export class FormRenderModule { }
