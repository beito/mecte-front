import { CustomClass } from "./custom-class";
import { CarrerasSelector } from "./carreras-class";

export interface ProcesoMejoraSelector {
    id: Number;
    codigo: string;
    descripcion: string;
}

export interface RawProcesoMejoraInterface {
    id?: number;
    codigo: string;
    fechaInicio: Date;
    fechaFin: Date;
    objetivos: string;
    descripcion: string;
    status: string;
    idCarrera: number;
}

export interface ProcesoMejoraInterface {
    id?: number;
    codigo: string;
    fechaInicio: Date;
    fechaFin: Date;
    objetivos: string;
    descripcion: string;
    status: string;
    idCarrera: number;

    formatedFechaInicio?: string;
    formatedFechaFin?: string;
    Carreras?: CarrerasSelector;
}

export class ProcesoMejoraClass extends CustomClass implements ProcesoMejoraInterface {
    public override id: number;
    public codigo: string;
    public fechaInicio: Date;
    public fechaFin: Date;
    public objetivos: string;
    public descripcion: string;
    public status: string;
    public idCarrera: number;

    public formatedFechaInicio: string;
    public formatedFechaFin: string;
    public Carreras: CarrerasSelector;

    constructor(procesoMejora?: ProcesoMejoraInterface) {
        super();
        if (procesoMejora) this.init(procesoMejora);
        else this.reset();
    }

    init(procesoMejora: ProcesoMejoraInterface) {
        this.id = procesoMejora.id || 0;
        this.codigo = procesoMejora.codigo || "";
        this.fechaInicio = procesoMejora.fechaInicio || new Date();
        this.fechaFin = procesoMejora.fechaFin || new Date();
        this.objetivos = procesoMejora.objetivos || "";
        this.descripcion = procesoMejora.descripcion || "";
        this.status = procesoMejora.status || "";
        this.idCarrera = procesoMejora.idCarrera || 0;

        this.formatedFechaInicio = procesoMejora.formatedFechaInicio || "";
        this.formatedFechaFin = procesoMejora.formatedFechaFin || "";
        this.Carreras = procesoMejora.Carreras || {id: 0, nombre: "", codigo: ""};
    }

    override reset(): void {
        this.id = -1;
        this.codigo = "";
        this.fechaInicio = new Date();
        this.fechaFin = new Date();
        this.objetivos = "";
        this.descripcion = "";
        this.status = "";
        this.idCarrera = -1;

        this.formatedFechaInicio = "";
        this.formatedFechaFin = "";
        this.Carreras = {id: -1, nombre: "", codigo: ""};
    }

    override raw(): RawProcesoMejoraInterface {
        let data: any = {};
            data.id = this.id;
            data.codigo = this.codigo;
            data.fechaInicio = this.fechaInicio;
            data.fechaFin = this.fechaFin;
            data.objetivos = this.objetivos;
            data.descripcion = this.descripcion;
            data.status = this.status;
            data.idCarrera = this.idCarrera;
        return data;
    }

    override dataToString(): RawProcesoMejoraInterface {
        let data: any = {};
            data.id = this.id;
            data.codigo = this.codigo;
            data.fechaInicio = this.fechaInicio;
            data.fechaFin = this.fechaFin;
            data.objetivos = this.objetivos;
            data.descripcion = this.descripcion;
            data.status = this.status;
            data.idCarrera = this.idCarrera;
        return data;
    }

    pretty(): void { }

    valid(): boolean {
        if (
            this.id &&
            this.codigo &&
            this.fechaInicio &&
            this.fechaFin &&
            this.objetivos &&
            this.descripcion &&
            this.status &&
            this.idCarrera
        ) {
            return true;
        }
        return false;
    }
}