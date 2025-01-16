import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormRenderComponent, form_type } from 'src/app/shared/form_render/form_render.component';
import { CarrerasService } from 'src/app/services/carreras/carreras.service';
import { FacultadesService } from 'src/app/services/facultades/facultades.service';
import { CarrerasInterface, CarrerasClass } from 'src/app/interfaces/carreras-class';
import { FacultadesSelector } from 'src/app/interfaces/facultades-class';

import swal from 'sweetalert2';

@Component({
  selector: 'app-carreras-form',
  templateUrl: './carreras-form.component.html',
  styleUrls: ['./carreras-form.component.scss']
})
export class CarreraFormComponent {
  @Input() carreras: CarrerasClass;
  @Input() method: "insert" | "update" | "show" = "insert";
  @Input() data: CarrerasInterface;
  @ViewChild('form_ref', { static: false }) form_ref: FormRenderComponent;

  public carreraID: number = 0;
  public form_config: form_type;
  public facultad: Array<FacultadesSelector> = [];

  constructor(
    private modalService: NgbModal,
    private facultadesApi: FacultadesService,
    private carrerasApi: CarrerasService,
  ) { }

  ngOnInit() {
    if (this.data.id && this.data.id > 0) {
      this.carreraID = this.data.id;
    }
    this.carreras = new CarrerasClass(this.data);
    this.facultadesApi.getFacultades().subscribe((data: any) => {
      this.facultad = data;
    });
    this.formConfigs();
  }

  customSubmit = (form: CarrerasClass) => {
    this.swalAlertDriver();
    let carrera = form.raw();
    delete carrera.id;
    if (this.carreraID) {
      this.carrerasApi.updateCarrera(this.carreraID, carrera).subscribe((data: {}) => {
        this.swalAlertDriver(1);
        this.modalService.dismissAll(true);
      }, (err) => {
        this.swalAlertDriver(2);
      });
    } else {
      this.carrerasApi.createCarrera(carrera).subscribe((data: {}) => {
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
      swal.update({ title: 'Completado', html: 'Carrera registrada correctamente', icon: 'success' });
    } else if (status === 2) {
      swal.hideLoading();
      swal.update({ title: 'Se presentó un Error', html: 'Se presentó un Error al procesar la información', icon: 'error' });
    } else {
      swal.fire({
        title: 'Procesando Carrera',
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
        this.customSubmit(this.carreras);
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
              name: 'nombre',
              type: 'text',
              label: 'Nombre',
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
              name: 'idFacultad',
              type: 'select',
              label: 'Facultad',
              placeholder: () => '- Seleccione -',
              col_class: 'col-md-6',
              validators: {
                required: {
                  value: () => true,
                }
              },
              catalog: {
                list: () => this.facultad,
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
                  class: `btn btn-sm ${(this.carreraID > 0) ? 'btn-warning': 'btn-success'} ms-2`,
                  label: (this.carreraID > 0) ? 'Actualizar': 'Guardar',
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
