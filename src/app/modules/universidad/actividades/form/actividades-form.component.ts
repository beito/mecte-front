import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormRenderComponent, form_type } from 'src/app/shared/form_render/form_render.component';
import { ActividadesService } from 'src/app/services/actividades/actividades.service';
import { ProcesosMejoraService } from 'src/app/services/procesos-mejora/procesos-mejora.service';
import { ActividadInterface, ActividadClass } from 'src/app/interfaces/actividades-class';
import { ProcesoMejoraSelector } from 'src/app/interfaces/proceso-mejora-class';

import swal from 'sweetalert2';

@Component({
  selector: 'app-actividades-form',
  templateUrl: './actividades-form.component.html',
  styleUrls: ['./actividades-form.component.scss']
})
export class ActividadFormComponent {
  @Input() actividades: ActividadClass;
  @Input() method: "insert" | "update" | "show" = "insert";
  @Input() data!: ActividadInterface;
  @ViewChild('form_ref', { static: false }) form_ref: FormRenderComponent;

  public actividadID: number = 0;
  public form_config: form_type;
  public procesoMejora: Array<ProcesoMejoraSelector> = [];

  constructor(
    private modalService: NgbModal,
    private actividadesApi: ActividadesService,
    private procesosMejoraApi: ProcesosMejoraService
  ) { }

  ngOnInit() {
    if (this.data.id && this.data.id > 0) {
      this.actividadID = this.data.id;
    }
    this.actividades = new ActividadClass(this.data);
    this.procesosMejoraApi.getProcesosMejora().subscribe((data: any) => {
      this.procesoMejora = data;
    });
    this.formConfigs();
  }

  customSubmit = (form: ActividadClass) => {
    this.swalAlertDriver();
    let actividad = form.raw();
    delete actividad.id;
    if (this.actividadID) {
      this.actividadesApi.updateActividad(this.actividadID, actividad).subscribe((data: {}) => {
        this.swalAlertDriver(1);
        this.modalService.dismissAll(true);
      }, (err) => {
        this.swalAlertDriver(2);
      });
    } else {
      this.actividadesApi.createActividad(actividad).subscribe((data: {}) => {
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
      swal.update({ title: 'Completado', html: 'Actividad registrada correctamente', icon: 'success' });
    } else if (status === 2) {
      swal.hideLoading();
      swal.update({ title: 'Se presentó un Error', html: 'Se presentó un Error al procesar la información', icon: 'error' });
    } else {
      swal.fire({
        title: 'Procesando Actividad',
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
        this.customSubmit(this.actividades);
      },
      rows: [
        {
          class: 'row',
          cols: [
            {
              name: 'codigo',
              type: 'text',
              label: 'Código de Actividad',
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
              label: 'Descripción de Actividad',
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
              name: 'acciones',
              type: 'text',
              label: 'Acciones',
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
              name: 'deadline',
              type: 'calendar',
              label: 'Deadline',
              placeholder: () => 'XX/XX/XXXX',
              col_class: 'col-md-6',
              validators: {
                required: {
                  value: () => true,
                }
              },
              disabled: () => false,
            },
            {
              name: 'status',
              type: 'text',
              label: 'Estado',
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
              name: 'idProcesoMejora',
              type: 'select',
              label: 'Proceso de Mejora',
              placeholder: () => '- Seleccione -',
              col_class: 'col-md-6',
              validators: {
                required: {
                  value: () => true,
                }
              },
              catalog: {
                list: () => this.procesoMejora,
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
                  class: `btn btn-sm ${(this.actividadID > 0) ? 'btn-warning': 'btn-success'} ms-2`,
                  label: (this.actividadID > 0) ? 'Actualizar': 'Guardar',
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
