import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './phonePipe';
import { shortDate } from './shortDate';
import { LongDate } from './longDate.component'
@NgModule({
  declarations: [PhonePipe, shortDate, LongDate],
  imports: [
    CommonModule
  ], exports: [PhonePipe, shortDate, LongDate]
})
export class PipesModule { }
