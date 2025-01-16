import { Component, Input, ViewChild } from '@angular/core';
import swal from 'sweetalert2';

import { EvaluacionesService } from 'src/app/services/evaluaciones/evaluaciones.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { DatatableComponent, datatable_type } from 'src/app/shared/datatable/datatable.component';
import { EvaluacionesInterface, EvaluacionesClass } from 'src/app/interfaces/evaluaciones-class';
import { EvaluacionesFormComponent } from '../form/evaluaciones-form.component';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.scss']
})
export class EvaluacionesComponent {
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

  public evaluaciones: Array<EvaluacionesClass> = [];

  constructor(
    private evaluacionesApi: EvaluacionesService,
    private modalService: ModalService
  ) {
    this.datatable_config();
  }

  ngOnInit() {
    this.fetchEvaluaciones({
      limit: 10,
      skip: 0
    });
    this.datatable_ref?.init();
  }

  fetchEvaluaciones(request: any) {
    this.evaluacionesApi.getEvaluacionesDT(request).subscribe((result: any) => {
      const {data, total} = result;
      this.evaluaciones = data.map((eachEvaluacion: EvaluacionesInterface) => new EvaluacionesClass(eachEvaluacion));
      this.data = {
        list: this.evaluaciones,
        count: total,
        skip: this.datatable_ref?.filters?.skip || 0
      };
    });
  }
  
  update(data: any) {
    if (this.datatable_ref) this.datatable_ref.loading = false;
    this.fetchEvaluaciones(data);
  }

  removeEvaluacion(id: number) {
    swal.fire({
      title: 'Eliminar',
      icon: 'warning',
      html: 'Esta seguro que desea eliminar la evaluación. Esta acción no se puede deshacer.',
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
        this.evaluacionesApi.deleteEvaluacion(id).subscribe(res => {
          swal.fire(
            'Confirmado',
            'Has eliminado la evaluación con éxito.',
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
      "Eliminar": (item) => this.removeEvaluacion(item.id),
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
        { label: "Puntaje", name: "puntaje", order_by: "puntaje" },
        { label: "Nivel", name: "nivel", order_by: "nivel" },
        { label: "Asignatura", name: "Asignaturas.nombre", order_by: "Asignaturas.nombre" },
        { label: "Período Académico", name: "PeriodosAcademicos.codigo", order_by: "PeriodosAcademicos.codigo" },
        { label: "Sub Competencia", name: "Subcompetencias.descripcion", order_by: "Subcompetencias.descripcion" }
      ],
      events: [
        { name: "Ver", icon: "fa fa-info text-info" },
        { name: "Editar", icon: "fa fa-edit text-warning" },
        { name: "Eliminar", icon: "fa fa-times text-danger" }
      ]
    };
  }

  openModalForm(resource: EvaluacionesInterface | null = null) {
    const data = resource || new EvaluacionesClass();
    this.modalService.open(EvaluacionesFormComponent, data, 'xl');
  }

  openModalFile() {
    // Implementación futura
  }
}
