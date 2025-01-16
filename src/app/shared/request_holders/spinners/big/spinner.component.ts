import { Component, OnChanges, Input } from '@angular/core';

@Component({
	selector: 'app-spinner-big',
	templateUrl: './spinner.component.html'
})

export class SpinnerBigComponent {
	@Input() loading!: boolean;
	@Input() class!: string;
	@Input() title!: string;
	@Input() inline!: boolean;

	constructor() {
	}

	ngOnChanges(changes:any) {
		if (changes.loading) {
			this.loading = changes.loading.currentValue;
		}
		if (changes.title) {
			this.title = changes.title.currentValue;
		}
		if (changes.class) {
			this.class = changes.class.currentValue;
		}
		if (changes.inline) {
			this.inline = changes.inline.currentValue;
		}
	}

}