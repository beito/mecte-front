import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormRenderComponent, form_type } from 'src/app/shared/form_render/form_render.component';
import { SeguimientosService } from 'src/app/services/seguimientos/seguimientos.service';
import { ActividadesService } from 'src/app/services/actividades/actividades.service';
import { SeguimientosInterface, SeguimientosClass } from 'src/app/interfaces/seguimientos-class';
import { ActividadesSelector } from 'src/app/interfaces/actividades-class';

import swal from 'sweetalert2';

@Component({
  selector: 'app-seguimientos-form',
  templateUrl: './seguimientos-form.component.html',
  styleUrls: ['./seguimientos-form.component.scss']
})
export class SeguimientoFormComponent {
  @Input() seguimientos: SeguimientosClass;
  @Input() method: "insert" | "update" | "show" = "insert";
  @Input() data!: SeguimientosInterface;
  @ViewChild('form_ref', { static: false }) form_ref: FormRenderComponent;

  public seguimientoID: number = 0;
  public form_config: form_type;
  public actividades: Array<ActividadesSelector> = [];

  constructor(
    private modalService: NgbModal,
    private seguimientosApi: SeguimientosService,
    private actividadesApi: ActividadesService
  ) { }

  ngOnInit() {
    if (this.data.id && this.data.id > 0) {
      this.seguimientoID = this.data.id;
    }
    this.seguimientos = new SeguimientosClass(this.data);
    this.actividadesApi.getActividades().subscribe((data: any) => {
      this.actividades = data;
    });
    this.formConfigs();
  }

  customSubmit = (form: SeguimientosClass) => {
    this.swalAlertDriver();
    let seguimiento = form.raw();
    delete seguimiento.id;
    if (this.seguimientoID) {
      this.seguimientosApi.updateSeguimiento(this.seguimientoID, seguimiento).subscribe((data: {}) => {
        this.swalAlertDriver(1);
        this.modalService.dismissAll(true);
      }, (err) => {
        this.swalAlertDriver(2);
      });
    } else {
      this.seguimientosApi.createSeguimiento(seguimiento).subscribe((data: {}) => {
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
      swal.update({ title: 'Completado', html: 'Seguimiento registrado correctamente', icon: 'success' });
    } else if (status === 2) {
      swal.hideLoading();
      swal.update({ title: 'Se presentó un Error', html: 'Se presentó un Error al procesar la información', icon: 'error' });
    } else {
      swal.fire({
        title: 'Procesando Seguimiento',
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
        this.customSubmit(this.seguimientos);
      },
      rows: [
        {
          class: 'row',
          cols: [
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
              name: 'resultados',
              type: 'text',
              label: 'Resultados',
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
              name: 'fecha',
              type: 'calendar',
              label: 'Fecha',
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
              name: 'idActividad',
              type: 'select',
              label: 'Actividad',
              placeholder: () => '- Seleccione -',
              col_class: 'col-md-6',
              validators: {
                required: {
                  value: () => true,
                }
              },
              catalog: {
                list: () => this.actividades,
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
                  class: `btn btn-sm ${(this.seguimientoID > 0) ? 'btn-warning': 'btn-success'} ms-2`,
                  label: (this.seguimientoID > 0) ? 'Actualizar': 'Guardar',
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
