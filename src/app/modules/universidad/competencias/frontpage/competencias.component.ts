import { Component, Input, ViewChild } from '@angular/core';
import swal from 'sweetalert2';

import { CompetenciasService } from 'src/app/services/competencias/competencias.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { DatatableComponent, datatable_type } from 'src/app/shared/datatable/datatable.component';
import { CompetenciasInterface, CompetenciasClass } from 'src/app/interfaces/competencias-class';
import { CompetenciasFormComponent } from '../form/competencias-form.component';

@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  styleUrls: ['./competencias.component.scss']
})
export class CompetenciasComponent {
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

  public competencias: Array<CompetenciasClass> = [];

  constructor(
    private competenciasApi: CompetenciasService,
    private modalService: ModalService
  ) {
    this.datatable_config();
  }

  ngOnInit() {
    this.fetchCompetencias({
      limit: 10,
      skip: 0
    });
    this.datatable_ref?.init();
  }

  fetchCompetencias(request: any) {
    this.competenciasApi.getCompetenciasDT(request).subscribe((result: any) => {
      const {data, total} = result;
      this.competencias = data.map((eachActividad: CompetenciasInterface) => new CompetenciasClass(eachActividad));
      this.data = {
        list: this.competencias,
        count: total,
        skip: this.datatable_ref?.filters?.skip || 0
      };
    });
  }
  
  update(data: any) {
    if (this.datatable_ref) this.datatable_ref.loading = false;
    this.fetchCompetencias(data);
  }

  removeActividad(id: number) {
    swal.fire({
      title: 'Eliminar',
      icon: 'warning',
      html: 'Esta seguro que desea eliminar la competencia. Esta acción no se puede deshacer.',
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
        this.competenciasApi.deleteCompetencia(id).subscribe(res => {
          swal.fire(
            'Confirmado',
            'Has eliminado la competencia con éxito.',
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
        { label: "Carrera", name: "Carreras.nombre", order_by: "Carreras.nombre" }
      ],
      events: [
        { name: "Ver", icon: "fa fa-info text-info" },
        { name: "Editar", icon: "fa fa-edit text-warning" },
        { name: "Eliminar", icon: "fa fa-times text-danger" }
      ]
    };
  }

  openModalForm(resource: CompetenciasInterface | null = null) {
    const data = resource || new CompetenciasClass();
    this.modalService.open(CompetenciasFormComponent, data, 'xl');
  }

  openModalFile() {
    // Implementación futura
  }
}
