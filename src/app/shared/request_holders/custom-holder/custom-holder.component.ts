import { Component, OnChanges, Input } from '@angular/core';

@Component({
    selector: 'app-custom-holder',
    templateUrl: './custom-holder.component.html'
})

export class CustomHolderComponent {
    @Input() icon!: string;
    @Input() icon_show!: boolean;
    @Input() title!: string;
    @Input() title_text!: string;
    @Input() title_show!: boolean;
    @Input() message!: string;
    @Input() message_show!: boolean;
    @Input() message_texts = [];
    @Input() message_interval!: number;
    @Input() inline!: true

    current_message!: string;
    message_index: number;

    constructor() {
        this.message = '';
        this.message_index = 0;
        setInterval(() => {
            if ( this.message_texts && this.message_texts.length > 0) {
                if (this.message_index++ >= this.message_texts.length) {
                    this.message_index = 0;
                }
                this.message = this.message_texts[this.message_index];
            }
        }, this.message_interval);
    }

    ngOnChanges(changes: any) {

        if (changes.icon) {
            this.icon = changes.icon.currentValue;
        }
        if (changes.icon_show) {
            this.icon_show = changes.icon_show.currentValue;
        }
        if (changes.title) {
            this.title = changes.title.currentValue;
        }
        if (changes.title_text) {
            this.title_text = changes.title_text.currentValue;
        }
        if (changes.title_show) {
            this.title_show = changes.title_show.currentValue;
        }
        if (changes.message) {
            this.message = changes.message.currentValue;
        }
        if (changes.message_show) {
            this.message_show = changes.message_show.currentValue;
        }
        if (changes.message_texts) {
            this.message_texts = changes.message_texts.currentValue;
        }
        if (changes.message_interval) {
            this.message_interval = changes.message_interval.currentValue;
        }
        if (changes.inline) {
            this.inline = changes.inline.currentValue;
        }
    }

}
