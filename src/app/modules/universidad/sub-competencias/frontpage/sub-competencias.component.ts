import { Component, Input, ViewChild } from '@angular/core';
import swal from 'sweetalert2';

import { SubCompetenciasService } from 'src/app/services/sub-competencias/sub-competencias.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { DatatableComponent, datatable_type } from 'src/app/shared/datatable/datatable.component';
import { SubCompetenciasInterface, SubCompetenciasClass } from 'src/app/interfaces/sub-competencias-class';
import { SubCompetenciasFormComponent } from '../form/sub-competencias-form.component';

@Component({
  selector: 'app-sub-competencias',
  templateUrl: './sub-competencias.component.html',
  styleUrls: ['./sub-competencias.component.scss']
})
export class SubCompetenciasComponent {
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

  public subCompetencias: Array<SubCompetenciasClass> = [];

  constructor(
    private subCompetenciasApi: SubCompetenciasService,
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
    this.subCompetenciasApi.getSubCompetenciasDT(request).subscribe((result: any) => {
      const {data, total} = result;
      this.subCompetencias = data.map((eachActividad: SubCompetenciasInterface) => new SubCompetenciasClass(eachActividad));
      this.data = {
        list: this.subCompetencias,
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
      html: 'Esta seguro que desea eliminar la sub competencia. Esta acción no se puede deshacer.',
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
        this.subCompetenciasApi.deleteSubCompetencia(id).subscribe(res => {
          swal.fire(
            'Confirmado',
            'Has eliminado la sub competencia con éxito.',
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
        { label: "Competencias", name: "Competencias.codigo", order_by: "Competencias.codigo" }
      ],
      events: [
        { name: "Ver", icon: "fa fa-info text-info" },
        { name: "Editar", icon: "fa fa-edit text-warning" },
        { name: "Eliminar", icon: "fa fa-times text-danger" }
      ]
    };
  }

  openModalForm(resource: SubCompetenciasInterface | null = null) {
    const data = resource || new SubCompetenciasClass();
    this.modalService.open(SubCompetenciasFormComponent, data, 'xl');
  }

  openModalFile() {
    // Implementación futura
  }
}
