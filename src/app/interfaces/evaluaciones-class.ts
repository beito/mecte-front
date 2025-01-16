import { CustomClass } from "./custom-class";
import { AsignaturasSelector } from "./asignaturas-class";
import { PeriodosAcademicosSelector } from "./periodos-academicos-class";
import { SubCompetenciasSelector } from "./sub-competencias-class";

export interface RawEvaluacionesInterface {
  id?: number;
  puntaje: number;
  nivel: string;
  idSubcompetencia: number;
  idAsignatura: number;
  idPeriodoAcademico: number;
}

export interface EvaluacionesInterface {
  id?: number;
  puntaje: number;
  nivel: string;
  idSubcompetencia: number;
  idAsignatura: number;
  idPeriodoAcademico: number;

  Asignaturas?: AsignaturasSelector;
  PeriodosAcademicos?: PeriodosAcademicosSelector;
  Subcompetencias?: SubCompetenciasSelector;
}

export class EvaluacionesClass extends CustomClass implements EvaluacionesInterface {
  public override id: number;
  public puntaje: number;
  public nivel: string;
  public idSubcompetencia: number;
  public idAsignatura: number;
  public idPeriodoAcademico: number;

  public Asignaturas: AsignaturasSelector;
  public PeriodosAcademicos: PeriodosAcademicosSelector;
  public Subcompetencias: SubCompetenciasSelector;

  constructor(evaluaciones?: EvaluacionesInterface) {
    super();
    if (evaluaciones) this.init(evaluaciones);
    else this.reset();
  }

  init(evaluaciones: EvaluacionesInterface) {
    this.id = evaluaciones.id || 0;
    this.puntaje = evaluaciones.puntaje || 0;
    this.nivel = evaluaciones.nivel || "";
    this.idSubcompetencia = evaluaciones.idSubcompetencia || 0;
    this.idAsignatura = evaluaciones.idAsignatura || 0;
    this.idPeriodoAcademico = evaluaciones.idPeriodoAcademico || 0;

    this.Asignaturas = evaluaciones.Asignaturas || {id: 0, codigo: "", nombre: ""};
    this.PeriodosAcademicos = evaluaciones.PeriodosAcademicos || {id: 0, codigo: ""};
    this.Subcompetencias = evaluaciones.Subcompetencias || {id: 0, codigo: "", descripcion: ""};
  }

  override reset(): void {
    this.id = -1;
    this.puntaje = -1;
    this.nivel = "";
    this.idSubcompetencia = -1;
    this.idAsignatura = -1;
    this.idPeriodoAcademico = -1;

    this.Asignaturas = {id: -1, codigo: "", nombre: ""};
    this.PeriodosAcademicos = {id: -1, codigo: ""};
    this.Subcompetencias = {id: -1, codigo: "", descripcion: ""};
  }

  override raw(): RawEvaluacionesInterface {
    let data: any = {};
      data.id = this.id;
      data.puntaje = this.puntaje;
      data.nivel = this.nivel;
      data.idSubcompetencia = this.idSubcompetencia;
      data.idAsignatura = this.idAsignatura;
      data.idPeriodoAcademico = this.idPeriodoAcademico;
    return data;
  }

  override dataToString(): RawEvaluacionesInterface {
    let data: any = {};
        data.id = this.id;
        data.puntaje = this.puntaje;
        data.nivel = this.nivel;
        data.idSubcompetencia = this.idSubcompetencia;
        data.idAsignatura = this.idAsignatura;
        data.idPeriodoAcademico = this.idPeriodoAcademico;
    return data;
  }

  pretty(): void { }

  valid(): boolean {
    if (
      this.id &&
      this.puntaje &&
      this.nivel &&
      this.idSubcompetencia &&
      this.idAsignatura &&
      this.idPeriodoAcademico
    ) {
      return true;
    }
    return false;
  }
}
