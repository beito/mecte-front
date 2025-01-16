import { CustomClass } from "./custom-class";

export interface PeriodosAcademicosSelector {
    id: Number;
    codigo: string;
}

export interface RawPeriodosAcademicosInterface {
    id?: number;
    codigo: string;
    anios: string;
    periodo: string;
}

export interface PeriodosAcademicosInterface {
    id?: number;
    codigo: string;
    anios: string;
    periodo: string;
}

export class PeriodosAcademicosClass extends CustomClass implements PeriodosAcademicosInterface {
    public override id: number;
    public codigo: string;
    public anios: string;
    public periodo: string;

    constructor(periodosAcademicos?: PeriodosAcademicosInterface) {
        super();
        if (periodosAcademicos) this.init(periodosAcademicos);
        else this.reset();
    }

    init(periodosAcademicos: PeriodosAcademicosInterface) {
        this.id = periodosAcademicos.id || 0;
        this.codigo = periodosAcademicos.codigo || "";
        this.anios = periodosAcademicos.anios || "";
        this.periodo = periodosAcademicos.periodo || "";
    }

    override reset(): void {
        this.id = -1;
        this.codigo = "";
        this.anios = "";
        this.periodo = "";
    }

    override raw(): RawPeriodosAcademicosInterface {
        let data: any = {};
            data.id = this.id;
            data.codigo = this.codigo;
            data.anios = this.anios;
            data.periodo = this.periodo;
        return data;
    }

    override dataToString(): RawPeriodosAcademicosInterface {
        let data: any = {};
            data.id = this.id;
            data.codigo = this.codigo;
            data.anios = this.anios;
            data.periodo = this.periodo;
        return data;
    }

    pretty(): void { }

    valid(): boolean {
        if (
            this.id &&
            this.codigo &&
            this.anios &&
            this.periodo
        ) {
            return true;
        }
        return false;
    }
}