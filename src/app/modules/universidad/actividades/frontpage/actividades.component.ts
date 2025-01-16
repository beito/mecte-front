import { Component, Input, ViewChild } from '@angular/core';
import swal from 'sweetalert2';

import { ActividadesService } from 'src/app/services/actividades/actividades.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { DatatableComponent, datatable_type } from 'src/app/shared/datatable/datatable.component';
import { ActividadInterface, ActividadClass } from 'src/app/interfaces/actividades-class';
import { ActividadFormComponent } from '../form/actividades-form.component';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent {
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

  public actividades: Array<ActividadClass> = [];

  constructor(
    private actividadesApi: ActividadesService,
    private modalService: ModalService
  ) {
    this.datatable_config();
  }

  ngOnInit() {
    this.fetchActividades({
      limit: 10,
      skip: 0
    });
    this.datatable_ref?.init();
  }

  fetchActividades(request: any) {
    this.actividadesApi.getActividadesDT(request).subscribe((result: any) => {
      const {data, total} = result;
      this.actividades = data.map((eachActividad: ActividadInterface) => new ActividadClass(eachActividad));
      this.data = {
        list: this.actividades,
        count: total,
        skip: this.datatable_ref?.filters?.skip || 0
      };
    });
  }
  
  update(data: any) {
    if (this.datatable_ref) this.datatable_ref.loading = false;
    this.fetchActividades(data);
  }

  removeActividad(id: number) {
    swal.fire({
      title: 'Eliminar',
      icon: 'warning',
      html: 'Esta seguro que desea eliminar la actividad. Esta acción no se puede deshacer.',
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
        this.actividadesApi.deleteActividad(id).subscribe(res => {
          swal.fire(
            'Confirmado',
            'Has eliminado la actividad con éxito.',
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
      "Eliminar": (item) => this.removeActividad(item.id),
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
        { label: "Descripción", name: "descripcion", order_by: "descripcion" },
        { label: "Acciones", name: "acciones", order_by: "acciones" },
        { label: "Fecha de Entrega", name: "formatedDeadline", order_by: "formatedDeadline" },
        { label: "Proceso de Mejora", name: "ProcesoMejora.codigo", order_by: "ProcesoMejora.codigo" }
      ],
      events: [
        { name: "Ver", icon: "fa fa-info text-info" },
        { name: "Editar", icon: "fa fa-edit text-warning" },
        { name: "Eliminar", icon: "fa fa-times text-danger" }
      ]
    };
  }

  openModalForm(resource: ActividadInterface | null = null) {
    const data = resource || new ActividadClass();
    this.modalService.open(ActividadFormComponent, data, 'xl');
  }

  openModalFile() {
    // Implementación futura
  }
}
