import { Component, OnChanges, Input } from '@angular/core';

@Component({
	selector: 'app-error-big',
	templateUrl: './error.component.html'
})

export class ErrorBigComponent {
	@Input() error!: boolean;
	@Input() class!: string;
	@Input() title!: string;
	@Input() inline!: boolean;

	constructor() {
	}

	ngOnChanges(changes:any) {
		if (changes.error) {
			this.error = changes.error.currentValue;
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