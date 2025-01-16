import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'longDate'})
export class LongDate implements PipeTransform {
  transform(str: string): string {    
    return new Date(str).toLocaleDateString('es-HN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true });
  }
}