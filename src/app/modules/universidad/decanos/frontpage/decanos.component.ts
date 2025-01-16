import { Component, Input, ViewChild } from '@angular/core';
import swal from 'sweetalert2';

import { DecanosService } from 'src/app/services/decanos/decanos.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { DatatableComponent, datatable_type } from 'src/app/shared/datatable/datatable.component';
import { DecanosInterface, DecanosClass } from 'src/app/interfaces/decanos-class';
import { DecanoFormComponent } from '../form/decanos-form.component';

@Component({
  selector: 'app-decanos',
  templateUrl: './decanos.component.html',
  styleUrls: ['./decanos.component.scss']
})
export class DecanosComponent {
  @Input() wizardView: boolean = false;
  public currentClass: number = 0;

  @ViewChild('datatable_ref', { static: false }) datatable_ref!: DatatableComponent;
  public datatable!: datatable_type;

  public data: any = {
    list: [],
    count: null,
    total: null,
    skip: null,
    loaded: null,
    search_word: "",
    loading: true,
    error: false,
    error_desc: ""
  };

  public decanos: Array<DecanosClass> = [];

  constructor(
    private decanosApi: DecanosService,
    private modalService: ModalService
  ) {
    this.datatable_config();
  }

  ngOnInit() {
    this.fetchDecanos({
      limit: 10,
      skip: 0
    });
    this.datatable_ref?.init();
  }

  fetchDecanos(request: any) {
    this.decanosApi.getDecanosDT(request).subscribe((result: any) => {
      const {data, total} = result;
      this.decanos = data.map((eachDecano: DecanosInterface) => new DecanosClass(eachDecano));
      this.data = {
        list: this.decanos,
        count: total,
        skip: this.datatable_ref?.filters?.skip || 0
      };
    });
  }
  
  update(data: any) {
    if (this.datatable_ref) this.datatable_ref.loading = false;
    this.fetchDecanos(data);
  }

  removeDecano(id: number) {
    swal.fire({
      title: 'Eliminar',
      icon: 'warning',
      html: 'Esta seguro que desea eliminar la decano. Esta acción no se puede deshacer.',
      allowOutsideClick: false,
      showCancelButton: true,
      showDenyButton: true,
      showConfirmButton: false,
      denyButtonText: 'Eliminar',
      focusCancel: true,
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isDenied) {
        this.decanosApi.deleteDecano(id).subscribe(res => {
          swal.fire(
            'Confirmado',
            'Has eliminado la decano con éxito.',
            'success'
          );
        });
      }
    });
  }

  events(data: any) {
    const actions: Record<string, (item: any) => void> = {
      "Ver": (item) => this.openModalForm(item),
      "Editar": (item) => this.openModalForm(item),
      "Eliminar": (item) => this.removeDecano(item.id),
    };
  
    actions[data.name]?.(data.item);
  }

  datatable_config() {
    this.datatable = {
      configs: {
        title: "",
        paginate: true,
        search: true
      },
      filters: {
        limit: 10,
        skip: 0
      },
      headers: [
        { label: "Código", name: "codigo", order_by: "codigo" },
        { label: "Facultad", name: "Facultades.nombre", order_by: "Facultades.nombre" }
      ],
      events: [
        { name: "Ver", icon: "fa fa-info text-info" },
        { name: "Editar", icon: "fa fa-edit text-warning" },
        { name: "Eliminar", icon: "fa fa-times text-danger" }
      ]
    };
  }

  openModalForm(resource: DecanosInterface | null = null) {
    const data = resource || new DecanosClass();
    this.modalService.open(DecanoFormComponent, data, 'xl');
  }

  openModalFile() {
    // Implementación futura
  }
}
