import { CustomClass } from "./custom-class";
import { CarrerasSelector } from "./carreras-class";

export interface AsignaturasSelector {
    id: Number;
    nombre: string;
    codigo: string;
}

export interface RawAsignaturasInterface {
    id?: number;
    nombre: string;
    codigo: string;
    idCarrera: number;
}

export interface AsignaturasInterface {
    id?: number;
    nombre: string;
    codigo: string;
    idCarrera: number;

    Carreras?: CarrerasSelector;
}

export class AsignaturasClass extends CustomClass implements AsignaturasInterface {
    public override id: number;
    public nombre: string;
    public codigo: string;
    public idCarrera: number;

    public Carreras: CarrerasSelector;

    constructor(asignaturas?: AsignaturasInterface) {
        super();
        if (asignaturas) this.init(asignaturas);
        else this.reset();
    }

    init(asignaturas: AsignaturasInterface) {
        this.id = asignaturas.id || 0;
        this.nombre = asignaturas.nombre || "";
        this.codigo = asignaturas.codigo || "";
        this.idCarrera = asignaturas.idCarrera || 0;

        this.Carreras = asignaturas.Carreras || {id: 0, nombre: "", codigo: ""};
    }

    override reset(): void {
        this.id = -1;
        this.nombre = "";
        this.codigo = "";
        this.idCarrera = -1;

        this.Carreras = {id: -1, nombre: "", codigo: ""};
    }

    override raw(): RawAsignaturasInterface {
        let data: any = {};
            data.id = this.id;
            data.nombre = this.nombre;
            data.codigo = this.codigo;
            data.idCarrera = this.idCarrera;
        return data;
    }

    override dataToString(): RawAsignaturasInterface {
        let data: any = {};
            data.id = this.id;
            data.nombre = this.nombre;
            data.codigo = this.codigo;
            data.idCarrera = this.idCarrera;
        return data;
    }

    pretty(): void { }

    valid(): boolean {
        if (
            this.id &&
            this.nombre &&
            this.codigo &&
            this.idCarrera
        ) {
            return true;
        }
        return false;
    }
}
