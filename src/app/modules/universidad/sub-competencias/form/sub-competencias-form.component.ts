import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormRenderComponent, form_type } from 'src/app/shared/form_render/form_render.component';
import { SubCompetenciasService } from 'src/app/services/sub-competencias/sub-competencias.service';
import { CompetenciasService } from 'src/app/services/competencias/competencias.service';
import { SubCompetenciasInterface, SubCompetenciasClass } from 'src/app/interfaces/sub-competencias-class';
import { CompetenciasSelector } from 'src/app/interfaces/competencias-class';

import swal from 'sweetalert2';

@Component({
  selector: 'app-sub-competencias-form',
  templateUrl: './sub-competencias-form.component.html',
  styleUrls: ['./sub-competencias-form.component.scss']
})
export class SubCompetenciasFormComponent {
  @Input() subCompetencias: SubCompetenciasClass;
  @Input() method: "insert" | "update" | "show" = "insert";
  @Input() data!: SubCompetenciasInterface;
  @ViewChild('form_ref', { static: false }) form_ref: FormRenderComponent;

  public subCompetenciaID: number = 0;
  public form_config: form_type;
  public competencias: Array<CompetenciasSelector> = [];

  constructor(
    private modalService: NgbModal,
    private subCompetenciasApi: SubCompetenciasService,
    private competenciasApi: CompetenciasService
  ) { }

  ngOnInit() {
    if (this.data.id && this.data.id > 0) {
      this.subCompetenciaID = this.data.id;
    }
    this.subCompetencias = new SubCompetenciasClass(this.data);
    this.competenciasApi.getCompetencias().subscribe((data: any) => {
      this.competencias = data;
    });
    this.formConfigs();
  }

  customSubmit = (form: SubCompetenciasClass) => {
    this.swalAlertDriver();
    let subCompetencia = form.raw();
    delete subCompetencia.id;
    if (this.subCompetenciaID) {
      this.subCompetenciasApi.updateSubCompetencia(this.subCompetenciaID, subCompetencia).subscribe((data: {}) => {
        this.swalAlertDriver(1);
        this.modalService.dismissAll(true);
      }, (err) => {
        this.swalAlertDriver(2);
      });
    } else {
      this.subCompetenciasApi.createSubCompetencia(subCompetencia).subscribe((data: {}) => {
        this.swalAlertDriver(1);
        this.modalService.dismissAll(true);
      }, (err) => {
        this.swalAlertDriver(2);
      });
    }
  }

  swalAlertDriver(status: number = 0) {
    if (status === 1) {
      swal.hideLoading();
      swal.update({ title: 'Completado', html: 'Sub competencia registrada correctamente', icon: 'success' });
    } else if (status === 2) {
      swal.hideLoading();
      swal.update({ title: 'Se presentó un Error', html: 'Se presentó un Error al procesar la información', icon: 'error' });
    } else {
      swal.fire({
        title: 'Procesando Competencia',
        html: 'Espere un momento hasta que la información sea registrada',
        allowOutsideClick: false
      });
      swal.showLoading();
    }
  }

  formConfigs() {
    this.form_config = {
      pretty_view: () => this.method === 'show',
      disabled: () => this.method === 'show',
      submit: () => {
        this.customSubmit(this.subCompetencias);
      },
      rows: [
        {
          class: 'row',
          cols: [
            {
              name: 'codigo',
              type: 'text',
              label: 'Código',
              placeholder: () => 'Comience a escribir',
              col_class: 'col-md-6',
              validators: {
                required: {
                  value: () => true,
                },
                maxlength: {
                  value: () => 100,
                }
              },
              change: () => { },
              disabled: () => false,
            },
            {
              name: 'descripcion',
              type: 'text',
              label: 'Descripción',
              placeholder: () => 'Comience a escribir',
              col_class: 'col-md-6',
              validators: {
                required: {
                  value: () => true,
                },
                maxlength: {
                  value: () => 100,
                }
              },
              change: () => { },
              disabled: () => false,
            },
            {
              name: 'idCompetencia',
              type: 'select',
              label: 'Competencia',
              placeholder: () => '- Seleccione -',
              col_class: 'col-md-6',
              validators: {
                required: {
                  value: () => true,
                }
              },
              catalog: {
                list: () => this.competencias,
                value: "id",
                text: "codigo"
              },
              disabled: () => false,
            }
          ]
        },
        {
          class: 'row mt-3',
          cols: [
            {
              type: 'buttons',
              col_class: 'col-12',
              buttons: [
                {
                  class: 'btn btn-sm btn-outline-danger ms-auto',
                  label: 'Cancelar',
                  type: 'modal_close',
                  icon: {
                    name: '',
                    class: 'fa fa-times',
                    position: 'left',
                  },
                  show: () => {
                    return this.method === 'update' || this.method === 'insert';
                  },
                },
                {
                  class: 'btn btn-sm btn-outline-danger ms-auto',
                  label: 'Cerrar',
                  type: 'modal_close',
                  icon: {
                    name: '',
                    class: 'fa fa-times',
                    position: 'left',
                  },
                  show: () => {
                    return this.method === 'show';
                  },
                },
                {
                  class: `btn btn-sm ${(this.subCompetenciaID > 0) ? 'btn-warning': 'btn-success'} ms-2`,
                  label: (this.subCompetenciaID > 0) ? 'Actualizar': 'Guardar',
                  type: 'submit',
                  icon: {
                    name: '',
                    class: 'fa fa-check',
                    position: 'right',
                  },
                  show: () => {
                    return this.method === 'update' || this.method === 'insert';
                  },
                  disabled: () => (this.form_ref ? !this.form_ref.valid() : false)
                }
              ]
            }
          ]
        }
      ]
    };
  }
}
