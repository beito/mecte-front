import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shortDate' })
export class shortDate implements PipeTransform {
    transform(str: string): string {
        return new Date(str).toLocaleDateString('es-HN', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }
}