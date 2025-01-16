import { Component, Input, ViewChild } from '@angular/core';
import swal from 'sweetalert2';

import { ProcesosMejoraService } from 'src/app/services/procesos-mejora/procesos-mejora.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { DatatableComponent, datatable_type } from 'src/app/shared/datatable/datatable.component';
import { ProcesoMejoraInterface, ProcesoMejoraClass } from 'src/app/interfaces/proceso-mejora-class';

import { ProcesoMejoraFormComponent } from '../form/procesos-mejora-form.component';

@Component({
  selector: 'app-procesos-mejora',
  templateUrl: './procesos-mejora.component.html',
  styleUrls: ['./procesos-mejora.component.scss']
})
export class ProcesosMejoraComponent {
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

  public procesosMejora: Array<ProcesoMejoraClass> = [];

  constructor(
    private procesoMejoraApi: ProcesosMejoraService,
    private modalService: ModalService
  ) {
    this.datatable_config();
  }

  ngOnInit() {
    this.fetchProcesosMejora({
      limit: 10,
      skip: 0
    });
    this.datatable_ref?.init();
  }

  fetchProcesosMejora(request: any) {
    this.procesoMejoraApi.getProcesosMejoraDT(request).subscribe((result: any) => {
      const {data, total} = result;
      this.procesosMejora = data.map((eachProcesoMejora: ProcesoMejoraInterface) => new ProcesoMejoraClass(eachProcesoMejora));
      this.data = {
        list: this.procesosMejora,
        count: total,
        skip: this.datatable_ref?.filters?.skip || 0
      };
    });
  }
  
  update(data: any) {
    if (this.datatable_ref) this.datatable_ref.loading = false;
    this.fetchProcesosMejora(data);
  }

  removeProcesoMejora(id: number) {
    swal.fire({
      title: 'Eliminar',
      icon: 'warning',
      html: 'Esta seguro que desea eliminar el proceso de mejora. Esta acción no se puede deshacer.',
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
        this.procesoMejoraApi.deleteProcesoMejora(id).subscribe(res => {
          swal.fire(
            'Confirmado',
            'Has eliminado el proceso de mejora con éxito.',
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
      "Eliminar": (item) => this.removeProcesoMejora(item.id),
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
        { label: "Objetivos", name: "objetivos", order_by: "objetivos" },
        { label: "Descripción", name: "descripcion", order_by: "descripcion" },
        { label: "Fecha de Inicio", name: "formatedFechaInicio", order_by: "formatedFechaInicio" },
        { label: "Fecha de Final", name: "formatedFechaFin", order_by: "formatedFechaFin" },
        { label: "Carrera", name: "Carreras.nombre", order_by: "Carreras.nombre" }
      ],
      events: [
        { name: "Ver", icon: "fa fa-info text-info" },
        { name: "Editar", icon: "fa fa-edit text-warning" },
        { name: "Eliminar", icon: "fa fa-times text-danger" }
      ]
    };
  }

  openModalForm(resource: ProcesoMejoraInterface | null = null) {
    const data = resource || new ProcesoMejoraClass();
    this.modalService.open(ProcesoMejoraFormComponent, data, 'xl');
  }

  openModalFile() {
    // Implementación futura
  }
}
