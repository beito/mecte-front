import { CustomClass } from "./custom-class";
import { ActividadesSelector } from "./actividades-class";

export interface RawSeguimientosInterface {
  id?: number;
  descripcion: string;
  resultados: string;
  acciones: string;
  fecha: Date;
  idActividad: number;
}

export interface SeguimientosInterface {
    id?: number;
    descripcion: string;
    resultados: string;
    acciones: string;
    fecha: Date;
    idActividad: number;
  
    formatedFechaSeguimiento?: string;
    Actividades?: ActividadesSelector;
}

export class SeguimientosClass extends CustomClass implements SeguimientosInterface {
  public override id: number;
  public descripcion: string;
  public resultados: string;
  public acciones: string;
  public fecha: Date;
  public idActividad: number;

  public formatedFechaSeguimiento: string;
  public Actividades: ActividadesSelector;

  constructor(seguimiento?: SeguimientosInterface) {
    super();
    if (seguimiento) this.init(seguimiento);
    else this.reset();
  }

  init(seguimiento: SeguimientosInterface) {
    this.id = seguimiento.id || 0;
    this.descripcion = seguimiento.descripcion || "";
    this.resultados = seguimiento.resultados || "";
    this.acciones = seguimiento.acciones || "";
    this.fecha = seguimiento.fecha || new Date();
    this.idActividad = seguimiento.idActividad || 0;

    this.formatedFechaSeguimiento = seguimiento.formatedFechaSeguimiento || "";
    this.Actividades = seguimiento.Actividades || {id: 0, codigo: "", descripcion: ""};
  }

  override reset(): void {
    this.id = -1;
    this.descripcion = "";
    this.resultados = "";
    this.acciones = "";
    this.fecha = new Date();
    this.idActividad = -1;

    this.formatedFechaSeguimiento = "";
    this.Actividades = {id: -1, codigo: "", descripcion: ""};
  }

  override raw(): RawSeguimientosInterface {
    let data: any = {};
        data.id = this.id;
        data.descripcion = this.descripcion;
        data.resultados = this.resultados;
        data.acciones = this.acciones;
        data.fecha = this.fecha;
        data.idActividad = this.idActividad;
    return data;
  }

  override dataToString(): RawSeguimientosInterface {
    let data: any = {};
        data.id = this.id;
        data.descripcion = this.descripcion;
        data.resultados = this.resultados;
        data.acciones = this.acciones;
        data.fecha = this.fecha;
        data.idActividad = this.idActividad;
    return data;
  }

  pretty(): void { }

  valid(): boolean {
    if (
      this.id &&
      this.descripcion &&
      this.resultados &&
      this.acciones &&
      this.fecha &&
      this.idActividad
    ) {
      return true;
    }
    return false;
  }
}
