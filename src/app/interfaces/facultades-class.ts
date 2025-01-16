import { CustomClass } from "./custom-class";

export interface FacultadesSelector {
    id: Number;
    nombre: string;
    codigo: string;
}

export interface RawFacultadesInterface {
    id?: number;
    nombre: string;
    codigo: string;
}

export interface FacultadesInterface {
    id?: number;
    nombre: string;
    codigo: string;
}

export class FacultadesClass extends CustomClass implements FacultadesInterface {
    public override id: number;
    public nombre: string;
    public codigo: string;

    constructor(facultades?: FacultadesInterface) {
        super();
        if (facultades) this.init(facultades);
        else this.reset();
    }

    init(facultades: FacultadesInterface) {
        this.id = facultades.id || 0;
        this.nombre = facultades.nombre || "";
        this.codigo = facultades.codigo || "";
    }

    override reset(): void {
        this.id = -1;
        this.nombre = "";
        this.codigo = "";
    }

    override raw(): RawFacultadesInterface {
        let data: any = {};
            data.id = this.id;
            data.nombre = this.nombre;
            data.codigo = this.codigo;
        return data;
    }

    override dataToString(): RawFacultadesInterface {
        let data: any = {};
            data.id = this.id;
            data.nombre = this.nombre;
            data.codigo = this.codigo;
        return data;
    }

    pretty(): void { }

    valid(): boolean {
        if (
            this.id &&
            this.nombre &&
            this.codigo
        ) {
            return true;
        }
        return false;
    }
}