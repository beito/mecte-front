import { Component, Input, ViewChild } from '@angular/core';
import swal from 'sweetalert2';

import { SeguimientosService } from 'src/app/services/seguimientos/seguimientos.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { DatatableComponent, datatable_type } from 'src/app/shared/datatable/datatable.component';
import { SeguimientosInterface, SeguimientosClass } from 'src/app/interfaces/seguimientos-class';
import { SeguimientoFormComponent } from '../form/seguimientos-form.component';

@Component({
  selector: 'app-seguimientos',
  templateUrl: './seguimientos.component.html',
  styleUrls: ['./seguimientos.component.scss']
})
export class SeguimientosComponent {
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

  public seguimientos: Array<SeguimientosClass> = [];

  constructor(
    private seguimientosApi: SeguimientosService,
    private modalService: ModalService
  ) {
    this.datatable_config();
  }

  ngOnInit() {
    this.fetchSeguimientos({
      limit: 10,
      skip: 0
    });
    this.datatable_ref?.init();
  }

  fetchSeguimientos(request: any) {
    this.seguimientosApi.getSeguimientosDT(request).subscribe((result: any) => {
      const {data, total} = result;
      this.seguimientos = data.map((eachActividad: SeguimientosInterface) => new SeguimientosClass(eachActividad));
      this.data = {
        list: this.seguimientos,
        count: total,
        skip: this.datatable_ref?.filters?.skip || 0
      };
    });
  }
  
  update(data: any) {
    if (this.datatable_ref) this.datatable_ref.loading = false;
    this.fetchSeguimientos(data);
  }

  removeSeguimiento(id: number) {
    swal.fire({
      title: 'Eliminar',
      icon: 'warning',
      html: 'Esta seguro que desea eliminar la seguimiento. Esta acción no se puede deshacer.',
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
        this.seguimientosApi.deleteSeguimiento(id).subscribe(res => {
          swal.fire(
            'Confirmado',
            'Has eliminado la seguimiento con éxito.',
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
      "Eliminar": (item) => this.removeSeguimiento(item.id),
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
        { label: "Descripción", name: "descripcion", order_by: "descripcion" },
        { label: "Resultado", name: "resultados", order_by: "resultados" },
        { label: "Acciones", name: "acciones", order_by: "acciones" },
        { label: "Fecha", name: "formatedFechaSeguimiento", order_by: "formatedFechaSeguimiento" },
        { label: "Actividad", name: "Actividades.codigo", order_by: "Actividades.codigo" }
      ],
      events: [
        { name: "Ver", icon: "fa fa-info text-info" },
        { name: "Editar", icon: "fa fa-edit text-warning" },
        { name: "Eliminar", icon: "fa fa-times text-danger" }
      ]
    };
  }

  openModalForm(resource: SeguimientosInterface | null = null) {
    const data = resource || new SeguimientosClass();
    this.modalService.open(SeguimientoFormComponent, data, 'xl');
  }

  openModalFile() {
    // Implementación futura
  }
}
