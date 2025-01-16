import { Component, Input, ViewChild } from '@angular/core';
import swal from 'sweetalert2';

import { PeriodosAcademicosService } from 'src/app/services/periodos-academicos/periodos-academicos.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { DatatableComponent, datatable_type } from 'src/app/shared/datatable/datatable.component';
import { PeriodosAcademicosInterface, PeriodosAcademicosClass } from 'src/app/interfaces/periodos-academicos-class';
import { PeriodoAcademicoFormComponent } from '../form/periodos-academicos-form.component';

@Component({
  selector: 'app-periodos-academicos',
  templateUrl: './periodos-academicos.component.html',
  styleUrls: ['./periodos-academicos.component.scss']
})
export class PeriodosAcademicosComponent {
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

  public periodosAcademicos: Array<PeriodosAcademicosClass> = [];

  constructor(
    private periodosAcademicosApi: PeriodosAcademicosService,
    private modalService: ModalService
  ) {
    this.datatable_config();
  }

  ngOnInit() {
    this.fetchPeriodosAcademicos({
      limit: 10,
      skip: 0
    });
    this.datatable_ref?.init();
  }

  fetchPeriodosAcademicos(request: any) {
    this.periodosAcademicosApi.getPeriodosAcademicosDT(request).subscribe((result: any) => {
      const {data, total} = result;
      this.periodosAcademicos = data.map((eachPeriodoAcademico: PeriodosAcademicosInterface) => new PeriodosAcademicosClass(eachPeriodoAcademico));
      this.data = {
        list: this.periodosAcademicos,
        count: total,
        skip: this.datatable_ref?.filters?.skip || 0
      };
    });
  }
  
  update(data: any) {
    if (this.datatable_ref) this.datatable_ref.loading = false;
    this.fetchPeriodosAcademicos(data);
  }

  removePeriodoAcademico(id: number) {
    swal.fire({
      title: 'Eliminar',
      icon: 'warning',
      html: 'Esta seguro que desea eliminar la periodo academico. Esta acción no se puede deshacer.',
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
        this.periodosAcademicosApi.deletePeriodoAcademico(id).subscribe(res => {
          swal.fire(
            'Confirmado',
            'Has eliminado la periodo academico con éxito.',
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
      "Eliminar": (item) => this.removePeriodoAcademico(item.id),
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
        { label: "Años", name: "anios", order_by: "anios" },
        { label: "Período", name: "periodo", order_by: "periodo" }
      ],
      events: [
        { name: "Ver", icon: "fa fa-info text-info" },
        { name: "Editar", icon: "fa fa-edit text-warning" },
        { name: "Eliminar", icon: "fa fa-times text-danger" }
      ]
    };
  }

  openModalForm(resource: PeriodosAcademicosInterface | null = null) {
    const data = resource || new PeriodosAcademicosClass();
    this.modalService.open(PeriodoAcademicoFormComponent, data, 'xl');
  }

  openModalFile() {
    // Implementación futura
  }
}
