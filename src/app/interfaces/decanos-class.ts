import { CustomClass } from "./custom-class";
import { FacultadesSelector } from "./facultades-class";

export interface RawDecanosInterface {
    id?: number;
    codigo: string;
    idFacultad: number;
    idUsuario: number;
}

export interface DecanosInterface {
    id?: number;
    codigo: string;
    idFacultad: number;
    idUsuario: number;

    Facultades?: FacultadesSelector;
}

export class DecanosClass extends CustomClass implements DecanosInterface {
    public override id: number;
    public codigo: string;
    public idFacultad: number;
    public idUsuario: number;

    public Facultades: FacultadesSelector;

    constructor(decanos?: DecanosInterface) {
        super();
        if (decanos) this.init(decanos);
        else this.reset();
    }

    init(decanos: DecanosInterface) {
        this.id = decanos.id || 0;
        this.codigo = decanos.codigo || "";
        this.idFacultad = decanos.idFacultad || 0;
        this.idUsuario = decanos.idUsuario || 0;

        this.Facultades = decanos.Facultades || {id: 0, nombre: "", codigo: ""};
    }

    override reset(): void {
        this.id = -1;
        this.codigo = "";
        this.idFacultad = -1;
        this.idUsuario = -1;

        this.Facultades = {id: -1, nombre: "", codigo: ""};
    }

    override raw(): RawDecanosInterface {
        let data: any = {};
            data.id = this.id;
            data.codigo = this.codigo;
            data.idFacultad = this.idFacultad;
            data.idUsuario = this.idUsuario;
        return data;
    }

    override dataToString(): RawDecanosInterface {
        let data: any = {};
            data.id = this.id;
            data.codigo = this.codigo;
            data.idFacultad = this.idFacultad;
            data.idUsuario = this.idUsuario;
        return data;
    }

    pretty(): void { }

    valid(): boolean {
        if (
            this.id &&
            this.codigo &&
            this.idFacultad && 
            this.idUsuario
        ) {
            return true;
        }
        return false;
    }
}