import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormRenderComponent, form_type } from 'src/app/shared/form_render/form_render.component';
import { EvaluacionesService } from 'src/app/services/evaluaciones/evaluaciones.service';
import { AsignaturasService } from 'src/app/services/asignaturas/asignaturas.service';
import { PeriodosAcademicosService } from 'src/app/services/periodos-academicos/periodos-academicos.service';
import { SubCompetenciasService } from 'src/app/services/sub-competencias/sub-competencias.service';
import { EvaluacionesInterface, EvaluacionesClass } from 'src/app/interfaces/evaluaciones-class';
import { AsignaturasSelector } from 'src/app/interfaces/asignaturas-class';
import { PeriodosAcademicosSelector } from 'src/app/interfaces/periodos-academicos-class';
import { SubCompetenciasSelector } from 'src/app/interfaces/sub-competencias-class';

import swal from 'sweetalert2';

@Component({
  selector: 'app-evaluaciones-form',
  templateUrl: './evaluaciones-form.component.html',
  styleUrls: ['./evaluaciones-form.component.scss']
})
export class EvaluacionesFormComponent {
  @Input() evaluaciones: EvaluacionesClass;
  @Input() method: "insert" | "update" | "show" = "insert";
  @Input() data!: EvaluacionesInterface;
  @ViewChild('form_ref', { static: false }) form_ref: FormRenderComponent;

  public evaluacionID: number = 0;
  public form_config: form_type;
  public asignaturas: Array<AsignaturasSelector> = [];
  public periodosAcademicos: Array<PeriodosAcademicosSelector> = [];
  public subCompetencias: Array<SubCompetenciasSelector> = [];

  constructor(
    private modalService: NgbModal,
    private evaluacionesApi: EvaluacionesService,
    private asignaturasApi: AsignaturasService,
    private periodosAcademicosApi: PeriodosAcademicosService,
    private subCompetenciasApi: SubCompetenciasService,
  ) { }

  ngOnInit() {
    if (this.data.id && this.data.id > 0) {
      this.evaluacionID = this.data.id;
    }
    this.evaluaciones = new EvaluacionesClass(this.data);
    console.log("Fachero: ");
    console.log(this.evaluaciones);

    this.asignaturasApi.getAsignaturas().subscribe((data: any) => {
      this.asignaturas = data;
    });
    this.periodosAcademicosApi.getPeriodosAcademicos().subscribe((data: any) => {
      this.periodosAcademicos = data;
    });
    this.subCompetenciasApi.getSubCompetencias().subscribe((data: any) => {
      this.subCompetencias = data;
    });
    this.formConfigs();
  }

  customSubmit = (form: EvaluacionesClass) => {
    this.swalAlertDriver();
    let evaluacion = form.raw();
    delete evaluacion.id;
    if (this.evaluacionID) {
      this.evaluacionesApi.updateEvaluacion(this.evaluacionID, evaluacion).subscribe((data: {}) => {
        this.swalAlertDriver(1);
        this.modalService.dismissAll(true);
      }, (err) => {
        this.swalAlertDriver(2);
      });
    } else {
      this.evaluacionesApi.createEvaluacion(evaluacion).subscribe((data: {}) => {
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
      swal.update({ title: 'Completado', html: 'Evaluación registrada correctamente', icon: 'success' });
    } else if (status === 2) {
      swal.hideLoading();
      swal.update({ title: 'Se presentó un Error', html: 'Se presentó un Error al procesar la información', icon: 'error' });
    } else {
      swal.fire({
        title: 'Procesando Evaluación',
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
        this.customSubmit(this.evaluaciones);
      },
      rows: [
        {
          class: 'row',
          cols: [
            {
              name: 'puntaje',
              type: 'text',
              label: 'Puntaje',
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
              name: 'nivel',
              type: 'text',
              label: 'Nivel',
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
              name: 'idAsignatura',
              type: 'select',
              label: 'Asignatura',
              placeholder: () => '- Seleccione -',
              col_class: 'col-md-6',
              validators: {
                required: {
                  value: () => true,
                }
              },
              catalog: {
                list: () => this.asignaturas,
                value: "id",
                text: "nombre"
              },
              disabled: () => false,
            },
            {
              name: 'idPeriodoAcademico',
              type: 'select',
              label: 'Período Académico',
              placeholder: () => '- Seleccione -',
              col_class: 'col-md-6',
              validators: {
                required: {
                  value: () => true,
                }
              },
              catalog: {
                list: () => this.periodosAcademicos,
                value: "id",
                text: "codigo"
              },
              disabled: () => false,
            },
            {
              name: 'idSubcompetencia',
              type: 'select',
              label: 'Sub Competencia',
              placeholder: () => '- Seleccione -',
              col_class: 'col-md-6',
              validators: {
                required: {
                  value: () => true,
                }
              },
              catalog: {
                list: () => this.subCompetencias,
                value: "id",
                text: "descripcion"
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
                  class: `btn btn-sm ${(this.evaluacionID > 0) ? 'btn-warning': 'btn-success'} ms-2`,
                  label: (this.evaluacionID > 0) ? 'Actualizar': 'Guardar',
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
