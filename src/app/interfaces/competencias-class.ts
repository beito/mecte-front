import { CustomClass } from "./custom-class";
import { CarrerasSelector } from "./carreras-class";

export interface CompetenciasSelector {
    id: Number;
    codigo: string;
    descripcion: string;
}

export interface RawCompetenciasInterface {
    id?: number;
    codigo: string;
    descripcion: string;
    idCarrera: number;
}

export interface CompetenciasInterface {
    id?: number;
    codigo: string;
    descripcion: string;
    idCarrera: number;

    Carreras?: CarrerasSelector;
}

export class CompetenciasClass extends CustomClass implements CompetenciasInterface {
    public override id: number;
    public codigo: string;
    public descripcion: string;
    public idCarrera: number;

    public Carreras: CarrerasSelector;

    constructor(competencias?: CompetenciasInterface) {
        super();
        if (competencias) this.init(competencias);
        else this.reset();
    }

    init(competencias: CompetenciasInterface) {
        this.id = competencias.id || 0;
        this.codigo = competencias.codigo || "";
        this.descripcion = competencias.descripcion || "";
        this.idCarrera = competencias.idCarrera || 0;

        this.Carreras = competencias.Carreras || {id: 0, nombre: "", codigo: ""};
    }

    override reset(): void {
        this.id = -1;
        this.codigo = "";
        this.descripcion = "";
        this.idCarrera = -1;

        this.Carreras = {id: -1, nombre: "", codigo: ""};
    }

    override raw(): RawCompetenciasInterface {
        let data: any = {};
            data.id = this.id;
            data.codigo = this.codigo;
            data.descripcion = this.descripcion;
            data.idCarrera = this.idCarrera;
        return data;
    }

    override dataToString(): RawCompetenciasInterface {
        let data: any = {};
            data.id = this.id;
            data.codigo = this.codigo;
            data.descripcion = this.descripcion;
            data.idCarrera = this.idCarrera;
        return data;
    }

    pretty(): void { }

    valid(): boolean {
        if (
            this.id &&
            this.codigo &&
            this.descripcion &&
            this.idCarrera
        ) {
            return true;
        }
        return false;
    }
}