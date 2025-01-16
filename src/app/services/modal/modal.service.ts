import { Injectable, Type } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalWrapperComponent } from 'src/app/shared/modals/modal-wrapper.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  open<T>(component: Type<T>, data: any = {}, size: 'sm' | 'lg' | 'xl' = 'lg'): NgbModalRef {
    const modalRef = this.modalService.open(ModalWrapperComponent, { size });
          modalRef.componentInstance.component = component;
          modalRef.componentInstance.data = data;
    return modalRef;
  }
}
