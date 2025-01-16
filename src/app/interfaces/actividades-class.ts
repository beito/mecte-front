import { CustomClass } from "./custom-class";
import { ProcesoMejoraSelector } from "./proceso-mejora-class";

export interface ActividadesSelector {
  id: Number;
  codigo: string;
  descripcion: string;
}

export interface RawActividadInterface {
  id?: number;
  codigo: string;
  descripcion: string;
  acciones: string;
  deadline: Date;
  status: string;
  idProcesoMejora: number;
}

export interface ActividadInterface {
  id?: number;
  codigo: string;
  descripcion: string;
  acciones: string;
  deadline: Date;
  status: string;
  idProcesoMejora: number;

  formatedDeadline?: string;
  ProcesoMejora?: ProcesoMejoraSelector;
}

export class ActividadClass extends CustomClass implements ActividadInterface {
  public override id: number;
  public codigo: string;
  public descripcion: string;
  public acciones: string;
  public deadline: Date;
  public status: string;
  public idProcesoMejora: number;

  public formatedDeadline: string;
  public ProcesoMejora: ProcesoMejoraSelector;

  constructor(actividad?: ActividadInterface) {
    super();
    if (actividad) this.init(actividad);
    else this.reset();
  }

  init(actividad: ActividadInterface) {
    this.id = actividad.id || 0;
    this.codigo = actividad.codigo || "";
    this.descripcion = actividad.descripcion || "";
    this.acciones = actividad.acciones || "";
    this.deadline = actividad.deadline || new Date();
    this.status = actividad.status || "";
    this.idProcesoMejora = actividad.idProcesoMejora || 0;

    this.formatedDeadline = actividad.formatedDeadline || "";
    this.ProcesoMejora = actividad.ProcesoMejora || {id: 0, codigo: "", descripcion: ""};
  }

  override reset(): void {
    this.id = -1;
    this.codigo = "";
    this.descripcion = "";
    this.acciones = "";
    this.deadline = new Date();
    this.status = "";
    this.idProcesoMejora = -1;

    this.formatedDeadline = "";
    this.ProcesoMejora = {id: -1, codigo: "", descripcion: ""};
  }

  override raw(): RawActividadInterface {
    let data: any = {};
        data.id = this.id;
        data.codigo = this.codigo;
        data.descripcion = this.descripcion;
        data.acciones = this.acciones;
        data.deadline = this.deadline;
        data.status = this.status;
        data.idProcesoMejora = this.idProcesoMejora;
    return data;
  }

  override dataToString(): RawActividadInterface {
    let data: any = {};
        data.id = this.id;
        data.codigo = this.codigo;
        data.descripcion = this.descripcion;
        data.acciones = this.acciones;
        data.deadline = this.deadline;
        data.status = this.status;
        data.idProcesoMejora = this.idProcesoMejora;
    return data;
  }

  pretty(): void { }

  valid(): boolean {
    if (
      this.id &&
      this.codigo &&
      this.descripcion &&
      this.acciones &&
      this.deadline &&
      this.status &&
      this.idProcesoMejora
    ) {
      return true;
    }
    return false;
  }
}
