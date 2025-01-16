import { CustomClass } from "./custom-class";
import { FacultadesSelector } from "./facultades-class";

export interface CarrerasSelector {
    id: Number;
    nombre: string;
    codigo: string;
}

export interface RawCarrerasInterface {
    id?: number;
    nombre: string;
    codigo: string;
    idFacultad: number;
}

export interface CarrerasInterface {
    id?: number;
    nombre: string;
    codigo: string;
    idFacultad: number;

    Facultades?: FacultadesSelector;
}

export class CarrerasClass extends CustomClass implements CarrerasInterface {
    public override id: number;
    public nombre: string;
    public codigo: string;
    public idFacultad: number;

    public Facultades: FacultadesSelector;

    constructor(carreras?: CarrerasInterface) {
        super();
        if (carreras) this.init(carreras);
        else this.reset();
    }

    init(carreras: CarrerasInterface) {
        this.id = carreras.id || 0;
        this.nombre = carreras.nombre || "";
        this.codigo = carreras.codigo || "";
        this.idFacultad = carreras.idFacultad || 0;

        this.Facultades = carreras.Facultades || {id: 0, nombre: "", codigo: ""};
    }

    override reset(): void {
        this.id = -1;
        this.nombre = "";
        this.codigo = "";
        this.idFacultad = -1;

        this.Facultades = {id: -1, nombre: "", codigo: ""};
    }

    override raw(): RawCarrerasInterface {
        let data: any = {};
            data.id = this.id;
            data.nombre = this.nombre;
            data.codigo = this.codigo;
            data.idFacultad = this.idFacultad;
        return data;
    }

    override dataToString(): RawCarrerasInterface {
        let data: any = {};
            data.id = this.id;
            data.nombre = this.nombre;
            data.codigo = this.codigo;
            data.idFacultad = this.idFacultad;
        return data;
    }

    pretty(): void { }

    valid(): boolean {
        if (
            this.id &&
            this.nombre &&
            this.codigo &&
            this.idFacultad
        ) {
            return true;
        }
        return false;
    }
}