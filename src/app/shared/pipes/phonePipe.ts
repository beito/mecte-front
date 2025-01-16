import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phone' })

export class PhonePipe implements PipeTransform {
	transform(str: string): string {
		if(str == null) {
			return '';
		}
		const takeFirst1 = str.substring(0, 4);
		const takeFirst2 = str.substring(4, 8);
		const result = "+504 " + takeFirst1 + "-" + takeFirst2
		return result;
	}
}