import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormRenderComponent, form_type } from 'src/app/shared/form_render/form_render.component';
import { ProcesosMejoraService } from 'src/app/services/procesos-mejora/procesos-mejora.service';
import { CarrerasService } from 'src/app/services/carreras/carreras.service';
import { ProcesoMejoraInterface, ProcesoMejoraClass } from 'src/app/interfaces/proceso-mejora-class';
import { CarrerasSelector } from 'src/app/interfaces/carreras-class';

import swal from 'sweetalert2';

@Component({
  selector: 'app-procesos-mejora-form',
  templateUrl: './procesos-mejora-form.component.html',
  styleUrls: ['./procesos-mejora-form.component.scss']
})
export class ProcesoMejoraFormComponent {
  @Input() procesosMejora: ProcesoMejoraClass;
  @Input() method: "insert" | "update" | "show" = "insert";
  @Input() data!: ProcesoMejoraInterface;
  @ViewChild('form_ref', { static: false }) form_ref: FormRenderComponent;

  public procesoMejoraID: number = 0;
  public form_config: form_type;
  public carreras: Array<CarrerasSelector> = [];

  constructor(
    private modalService: NgbModal,
    private procesoMejoraApi: ProcesosMejoraService,
    private carrerasApi: CarrerasService
  ) { }

  ngOnInit() {
    if (this.data.id && this.data.id > 0) {
      this.procesoMejoraID = this.data.id;
    }
    this.procesosMejora = new ProcesoMejoraClass(this.data);
    this.carrerasApi.getCarreras().subscribe((data: any) => {
      this.carreras = data;
    });
    this.formConfigs();
  }

  customSubmit = (form: ProcesoMejoraClass) => {
    this.swalAlertDriver();
    let procesoMejora = form.raw();
    delete procesoMejora.id;
    if (this.procesoMejoraID) {
      this.procesoMejoraApi.updateProcesoMejora(this.procesoMejoraID, procesoMejora).subscribe((data: {}) => {
        this.swalAlertDriver(1);
        this.modalService.dismissAll(true);
      }, (err) => {
        this.swalAlertDriver(2);
      });
    } else {
      this.procesoMejoraApi.createProcesoMejora(procesoMejora).subscribe((data: {}) => {
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
      swal.update({ title: 'Completado', html: 'Proceso de Mejora registrado correctamente', icon: 'success' });
    } else if (status === 2) {
      swal.hideLoading();
      swal.update({ title: 'Se presentó un Error', html: 'Se presentó un Error al procesar la información', icon: 'error' });
    } else {
      swal.fire({
        title: 'Procesando Proceso de Mejora',
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
        this.customSubmit(this.procesosMejora);
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
              name: 'objetivos',
              type: 'text',
              label: 'Objetivos',
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
              name: 'fechaInicio',
              type: 'calendar',
              label: 'Fecha de Inicio',
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
              name: 'fechaFin',
              type: 'calendar',
              label: 'Fecha Final',
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
              name: 'idCarrera',
              type: 'select',
              label: 'Carrera',
              placeholder: () => '- Seleccione -',
              col_class: 'col-md-6',
              validators: {
                required: {
                  value: () => true,
                }
              },
              catalog: {
                list: () => this.carreras,
                value: "id",
                text: "nombre"
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
                  class: `btn btn-sm ${(this.procesoMejoraID > 0) ? 'btn-warning': 'btn-success'} ms-2`,
                  label: (this.procesoMejoraID > 0) ? 'Actualizar': 'Guardar',
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
