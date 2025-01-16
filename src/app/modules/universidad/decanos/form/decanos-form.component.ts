import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormRenderComponent, form_type } from 'src/app/shared/form_render/form_render.component';
import { DecanosService } from 'src/app/services/decanos/decanos.service';
import { FacultadesService } from 'src/app/services/facultades/facultades.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DecanosInterface, DecanosClass } from 'src/app/interfaces/decanos-class';
import { FacultadesSelector } from 'src/app/interfaces/facultades-class';

import swal from 'sweetalert2';

@Component({
  selector: 'app-decanos-form',
  templateUrl: './decanos-form.component.html',
  styleUrls: ['./decanos-form.component.scss']
})
export class DecanoFormComponent {
  @Input() decanos: DecanosClass;
  @Input() method: "insert" | "update" | "show" = "insert";
  @Input() data!: DecanosInterface;
  @ViewChild('form_ref', { static: false }) form_ref: FormRenderComponent;

  public decanoID: number = 0;
  public form_config: form_type;
  public facultades: Array<FacultadesSelector> = [];
  public usuarios: Array<any> = [];

  constructor(
    private modalService: NgbModal,
    private decanosApi: DecanosService,
    private authApi: AuthService,
    private facultadesApi: FacultadesService
  ) { }

  ngOnInit() {
    if (this.data.id && this.data.id > 0) {
      this.decanoID = this.data.id;
    }
    this.decanos = new DecanosClass(this.data);
    this.facultadesApi.getFacultades().subscribe((data: any) => {
      this.facultades = data;
    });
    this.authApi.getUsers().subscribe((data: any) => {
      this.usuarios = data;
    });
    this.formConfigs();
  }

  customSubmit = (form: DecanosClass) => {
    this.swalAlertDriver();
    let decano = form.raw();
    delete decano.id;
    if (this.decanoID) {
      this.decanosApi.updateDecano(this.decanoID, decano).subscribe((data: {}) => {
        this.swalAlertDriver(1);
        this.modalService.dismissAll(true);
      }, (err) => {
        this.swalAlertDriver(2);
      });
    } else {
      this.decanosApi.createDecano(decano).subscribe((data: {}) => {
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
      swal.update({ title: 'Completado', html: 'Decano registrada correctamente', icon: 'success' });
    } else if (status === 2) {
      swal.hideLoading();
      swal.update({ title: 'Se presentó un Error', html: 'Se presentó un Error al procesar la información', icon: 'error' });
    } else {
      swal.fire({
        title: 'Procesando Decano',
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
        this.customSubmit(this.decanos);
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
                list: () => this.facultades,
                value: "id",
                text: "nombre"
              },
              disabled: () => false,
            },
            {
              name: 'idUsuario',
              type: 'select',
              label: 'Usuarios',
              placeholder: () => '- Seleccione -',
              col_class: 'col-md-6',
              validators: {
                required: {
                  value: () => true,
                }
              },
              catalog: {
                list: () => this.usuarios,
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
                  class: `btn btn-sm ${(this.decanoID > 0) ? 'btn-warning': 'btn-success'} ms-2`,
                  label: (this.decanoID > 0) ? 'Actualizar': 'Guardar',
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
