import { Component, Input, ViewChild } from '@angular/core';
import swal from 'sweetalert2';

import { AsignaturasService } from 'src/app/services/asignaturas/asignaturas.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { DatatableComponent, datatable_type } from 'src/app/shared/datatable/datatable.component';
import { AsignaturasInterface, AsignaturasClass } from 'src/app/interfaces/asignaturas-class';
import { AsignaturaFormComponent } from '../form/asignaturas-form.component';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.scss']
})
export class AsignaturasComponent {
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

  public asignaturas: Array<AsignaturasClass> = [];

  constructor(
    private asignaturasApi: AsignaturasService,
    private modalService: ModalService
  ) {
    this.datatable_config();
  }

  ngOnInit() {
    this.fetchAsignaturas({
      limit: 10,
      skip: 0
    });
    this.datatable_ref?.init();
  }

  fetchAsignaturas(request: any) {
    this.asignaturasApi.getAsignaturasDT(request).subscribe((result: any) => {
      const {data, total} = result;
      this.asignaturas = data.map((eachActividad: AsignaturasInterface) => new AsignaturasClass(eachActividad));
      this.data = {
        list: this.asignaturas,
        count: total,
        skip: this.datatable_ref?.filters?.skip || 0
      };
    });
  }
  
  update(data: any) {
    if (this.datatable_ref) this.datatable_ref.loading = false;
    this.fetchAsignaturas(data);
  }

  removeAsignatura(id: number) {
    swal.fire({
      title: 'Eliminar',
      icon: 'warning',
      html: 'Esta seguro que desea eliminar la asignatura. Esta acción no se puede deshacer.',
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
        this.asignaturasApi.deleteAsignatura(id).subscribe(res => {
          swal.fire(
            'Confirmado',
            'Has eliminado la asignatura con éxito.',
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
      "Eliminar": (item) => this.removeAsignatura(item.id),
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
        { label: "Nombre", name: "nombre", order_by: "nombre" },
        { label: "Carrera", name: "Carreras.nombre", order_by: "Carreras.nombre" }
      ],
      events: [
        { name: "Ver", icon: "fa fa-info text-info" },
        { name: "Editar", icon: "fa fa-edit text-warning" },
        { name: "Eliminar", icon: "fa fa-times text-danger" }
      ]
    };
  }

  openModalForm(resource: AsignaturasInterface | null = null) {
    const data = resource || new AsignaturasClass();
    this.modalService.open(AsignaturaFormComponent, data, 'xl');
  }

  openModalFile() {
    // Implementación futura
  }
}
