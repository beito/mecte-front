import { Component, Input, ViewChild } from '@angular/core';
import swal from 'sweetalert2';

import { FacultadesService } from 'src/app/services/facultades/facultades.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { DatatableComponent, datatable_type } from 'src/app/shared/datatable/datatable.component';
import { FacultadesInterface, FacultadesClass } from 'src/app/interfaces/facultades-class';
import { FacultadFormComponent } from '../form/facultades-form.component';

@Component({
  selector: 'app-facultades',
  templateUrl: './facultades.component.html',
  styleUrls: ['./facultades.component.scss']
})
export class FacultadesComponent {
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

  public facultades: Array<FacultadesClass> = [];

  constructor(
    private facultadesApi: FacultadesService,
    private modalService: ModalService
  ) {
    this.datatable_config();
  }

  ngOnInit() {
    this.fetchFacultades({
      limit: 10,
      skip: 0
    });
    this.datatable_ref?.init();
  }

  fetchFacultades(request: any) {
    this.facultadesApi.getFacultadesDT(request).subscribe((result: any) => {
      const {data, total} = result;
      this.facultades = data.map((eachFacultad: FacultadesInterface) => new FacultadesClass(eachFacultad));
      this.data = {
        list: this.facultades,
        count: total,
        skip: this.datatable_ref?.filters?.skip || 0
      };
    });
  }
  
  update(data: any) {
    if (this.datatable_ref) this.datatable_ref.loading = false;
    this.fetchFacultades(data);
  }

  removeFacultad(id: number) {
    swal.fire({
      title: 'Eliminar',
      icon: 'warning',
      html: 'Esta seguro que desea eliminar la facultad. Esta acción no se puede deshacer.',
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
        this.facultadesApi.deleteFacultad(id).subscribe(res => {
          swal.fire(
            'Confirmado',
            'Has eliminado la facultad con éxito.',
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
      "Eliminar": (item) => this.removeFacultad(item.id),
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
        { label: "Nombre", name: "nombre", order_by: "nombre" }
      ],
      events: [
        { name: "Ver", icon: "fa fa-info text-info" },
        { name: "Editar", icon: "fa fa-edit text-warning" },
        { name: "Eliminar", icon: "fa fa-times text-danger" }
      ]
    };
  }

  openModalForm(resource: FacultadesInterface | null = null) {
    const data = resource || new FacultadesClass();
    this.modalService.open(FacultadFormComponent, data, 'xl');
  }

  openModalFile() {
    // Implementación futura
  }
}
