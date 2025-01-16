import { Component, OnChanges, Input } from '@angular/core';

@Component({
    selector: 'app-overlay',
    templateUrl: './overlay.component.html'
})

export class OverlayComponent {
    @Input() title: string;
    @Input() message: string;
    @Input() icon!: string;
    @Input() show!: boolean;

    constructor() {
        this.message = '';
        this.title = '';        
    }

    ngOnChanges(changes:any) {

        if (changes.message) {
            this.message = changes.message.currentValue;
        }
        if (changes.title) {
            this.title = changes.title.currentValue;
        }
        if (changes.show) {
            this.show = changes.show.currentValue;
        }
        if (changes.icon) {
            this.icon = changes.icon.currentValue;
        }
    }

}
