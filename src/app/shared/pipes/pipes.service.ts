import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PipesService {
  private months = [
    {
      value: '01',
      label: 'Enero',
    },
    {
      value: '02',
      label: 'Febrero',
    },
    {
      value: '03',
      label: 'Marzo',
    },
    {
      value: '04',
      label: 'Abril',
    },
    {
      value: '05',
      label: 'Mayo',
    },
    {
      value: '06',
      label: 'Junio',
    },
    {
      value: '07',
      label: 'Julio',
    },
    {
      value: '08',
      label: 'Agosto',
    },
    {
      value: '09',
      label: 'Septiembre',
    },
    {
      value: '10',
      label: 'Octubre',
    },
    {
      value: '11',
      label: 'Noviembre',
    },
    {
      value: '12',
      label: 'Diciembre',
    },
  ];

  constructor() { }

  micro_date(str: string): string {
    if (str) {
      return this.formatDate(new Date(str));
    } else {
      return '';
    }
  }

  micro_datetime(str: string): string {
    if (str) {
      return this.formatDate(new Date(str), true, true);
    } else {
      return '';
    }
  }

  monthYear(str: string): string {
    let date = new Date(str).toLocaleDateString('es-HN', {
      year: 'numeric',
      month: 'long',
    });
    let fragments = date.split(' ');
    return `${fragments[0].charAt(0).toUpperCase() + fragments[0].slice(1)
      } ${fragments.slice(2).join(' ')}`;
  }

  number(num: any, min: number = 2, max: number = 2): string {
    let _num = num ? parseFloat((num + '').replace(/,|L /g, '')) : 0;

    return _num.toLocaleString('es-HN', {
      minimumFractionDigits: min,
      maximumFractionDigits: max,
    });
  }

  money(num: any, coin: string, min: number = 2, max: number = 2): string {
    return `${coin ? coin : ''}${this.number(num, min, max)}`;
  }

  public eval(fn: string): Function {
    return new Function('return ' + fn);
  }

  formatDate(date: Date, hours?: boolean, h24?: boolean): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    let _date = `${day}/${this.months.find(val => val.value == month)?.label}/${year}`;

    if (hours) {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      let _hours: string = hours;
      let _hours_ext: string = '';
      if (h24) {
        const int_hours = parseInt(hours);
        _hours = String(
          int_hours == 0 ? '12' : int_hours > 12 ? int_hours - 12 : int_hours
        ).padStart(2, '0');
        _hours_ext = int_hours >= 12 ? 'p.m.' : 'a.m.';
      }

      _date += ` - ${_hours}:${minutes} ${_hours_ext}`;
    }

    return _date;
  }
}
