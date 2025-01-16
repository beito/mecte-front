import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { CustomHolderComponent } from '../request_holders/custom-holder/custom-holder.component';
import { SpinnerBigComponent } from '../request_holders/spinners/big/spinner.component';
import { SpinnerSmallComponent } from '../request_holders/spinners/small/spinner.component';
import { ErrorBigComponent } from '../request_holders/errors/big/error.component';
import { ErrorSmallComponent } from '../request_holders/errors/small/error.component';

@NgModule({
  declarations: [
    DatatableComponent,
    CustomHolderComponent, SpinnerBigComponent, SpinnerSmallComponent, ErrorBigComponent, ErrorSmallComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    DatatableComponent,
    CustomHolderComponent, SpinnerBigComponent, SpinnerSmallComponent, ErrorBigComponent, ErrorSmallComponent
  ]
})
export class DatatableModule { }
