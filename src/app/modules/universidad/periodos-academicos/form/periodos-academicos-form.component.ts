import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormRenderComponent, form_type } from 'src/app/shared/form_render/form_render.component';
import { PeriodosAcademicosService } from 'src/app/services/periodos-academicos/periodos-academicos.service';
import { PeriodosAcademicosInterface, PeriodosAcademicosClass } from 'src/app/interfaces/periodos-academicos-class';

import swal from 'sweetalert2';

@Component({
  selector: 'app-periodos-academicos-form',
  templateUrl: './periodos-academicos-form.component.html',
  styleUrls: ['./periodos-academicos-form.component.scss']
})
export class PeriodoAcademicoFormComponent {
  @Input() periodosAcademicos: PeriodosAcademicosClass;
  @Input() method: "insert" | "update" | "show" = "insert";
  @Input() data!: PeriodosAcademicosInterface;
  @ViewChild('form_ref', { static: false }) form_ref: FormRenderComponent;

  public periodoAcademicoID: number = 0;
  public form_config: form_type;

  constructor(
    private modalService: NgbModal,
    private periodosAcademicosApi: PeriodosAcademicosService,
  ) { }

  ngOnInit() {
    if (this.data.id && this.data.id > 0) {
      this.periodoAcademicoID = this.data.id;
    }
    this.periodosAcademicos = new PeriodosAcademicosClass(this.data);
    this.formConfigs();
  }

  customSubmit = (form: PeriodosAcademicosClass) => {
    this.swalAlertDriver();
    let periodoAcademico = form.raw();
    delete periodoAcademico.id;
    if (this.periodoAcademicoID) {
      this.periodosAcademicosApi.updatePeriodoAcademico(this.periodoAcademicoID, periodoAcademico).subscribe((data: {}) => {
        this.swalAlertDriver(1);
        this.modalService.dismissAll(true);
      }, (err) => {
        this.swalAlertDriver(2);
      });
    } else {
      this.periodosAcademicosApi.createPeriodoAcademico(periodoAcademico).subscribe((data: {}) => {
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
      swal.update({ title: 'Completado', html: 'Periodo Académico registrado correctamente', icon: 'success' });
    } else if (status === 2) {
      swal.hideLoading();
      swal.update({ title: 'Se presentó un Error', html: 'Se presentó un Error al procesar la información', icon: 'error' });
    } else {
      swal.fire({
        title: 'Procesando Periodo Academico',
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
        this.customSubmit(this.periodosAcademicos);
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
              name: 'anios',
              type: 'text',
              label: 'Años',
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
              name: 'periodo',
              type: 'text',
              label: 'Periodo',
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
                  class: `btn btn-sm ${(this.periodoAcademicoID > 0) ? 'btn-warning': 'btn-success'} ms-2`,
                  label: (this.periodoAcademicoID > 0) ? 'Actualizar': 'Guardar',
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
