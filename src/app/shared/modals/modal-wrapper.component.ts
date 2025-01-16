import { Component, Input, ViewChild, ViewContainerRef, OnInit, Type } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-wrapper',
  template: `<div #container></div>`,
})
export class ModalWrapperComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  @Input() component!: Type<any>;
  @Input() data: any;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if (!this.component) {
      console.error('ModalWrapperComponent: No component provided!');
      return;
    }
    const componentRef = this.container.createComponent(this.component);
    Object.assign(componentRef.instance, { data: this.data });
  }
}
