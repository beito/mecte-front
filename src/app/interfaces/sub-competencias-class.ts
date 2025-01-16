import { CustomClass } from "./custom-class";
import { CompetenciasSelector } from "./competencias-class";

export interface SubCompetenciasSelector {
    id: Number;
    codigo: string;
    descripcion: string;
}

export interface RawSubCompetenciasInterface {
    id?: number;
    codigo: string;
    descripcion: string;
    idCompetencia: number;
}

export interface SubCompetenciasInterface {
    id?: number;
    codigo: string;
    descripcion: string;
    idCompetencia: number;

    Competencias?: CompetenciasSelector;
}

export class SubCompetenciasClass extends CustomClass implements SubCompetenciasInterface {
    public override id: number;
    public codigo: string;
    public descripcion: string;
    public idCompetencia: number;

    public Competencias: CompetenciasSelector;

    constructor(subCompetencias?: SubCompetenciasInterface) {
        super();
        if (subCompetencias) this.init(subCompetencias);
        else this.reset();
    }

    init(subCompetencias: SubCompetenciasInterface) {
        this.id = subCompetencias.id || 0;
        this.codigo = subCompetencias.codigo || "";
        this.descripcion = subCompetencias.descripcion || "";
        this.idCompetencia = subCompetencias.idCompetencia || 0;

        this.Competencias = subCompetencias.Competencias || {id: 0, codigo: "", descripcion: ""};
    }

    override reset(): void {
        this.id = -1;
        this.codigo = "";
        this.descripcion = "";
        this.idCompetencia = -1;

        this.Competencias = {id: -1, codigo: "", descripcion: ""};
    }

    override raw(): RawSubCompetenciasInterface {
        let data: any = {};
            data.id = this.id;
            data.codigo = this.codigo;
            data.descripcion = this.descripcion;
            data.idCompetencia = this.idCompetencia;
        return data;
    }

    override dataToString(): RawSubCompetenciasInterface {
        let data: any = {};
            data.id = this.id;
            data.codigo = this.codigo;
            data.descripcion = this.descripcion;
            data.idCompetencia = this.idCompetencia;
        return data;
    }

    pretty(): void { }

    valid(): boolean {
        if (
            this.id && 
            this.codigo && 
            this.descripcion && 
            this.idCompetencia
        ) {
            return true;
        }
        return false;
    }
}