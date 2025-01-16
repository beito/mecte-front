import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MecteComponent } from './mecte.component';
import { ActividadesComponent } from './actividades/frontpage/actividades.component';
import { AsignaturasComponent } from './asignaturas/frontpage/asignaturas.component';
import { CarrerasComponent } from './carreras/frontpage/carreras.component';
import { CompetenciasComponent } from './competencias/frontpage/competencias.component';
import { DecanosComponent } from './decanos/frontpage/decanos.component';
import { FacultadesComponent } from './facultades/frontpage/facultades.component';
import { PeriodosAcademicosComponent } from './periodos-academicos/frontpage/periodos-academicos.component';
import { ProcesosMejoraComponent } from './procesos-mejora/frontpage/procesos-mejora.component';
import { SeguimientosComponent } from './seguimientos/frontpage/seguimientos.component';
import { SubCompetenciasComponent } from './sub-competencias/frontpage/sub-competencias.component';
import { EvaluacionesComponent } from './evaluaciones/frontpage/evaluaciones.component';

import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: MecteComponent,
    children: [
      {
        path: 'actividades',
        component: ActividadesComponent
      },
      {
        path: 'asignaturas',
        component: AsignaturasComponent
      },
      {
        path: 'carreras',
        component: CarrerasComponent
      },
      {
        path: 'competencias',
        component: CompetenciasComponent
      },
      {
        path: 'decanos',
        component: DecanosComponent
      },
      {
        path: 'facultades',
        component: FacultadesComponent
      },
      {
        path: 'periodos-academicos',
        component: PeriodosAcademicosComponent
      },
      {
        path: 'procesos-mejora',
        component: ProcesosMejoraComponent
      },
      {
        path: 'seguimientos',
        component: SeguimientosComponent
      },
      {
        path: 'sub-competencias',
        component: SubCompetenciasComponent
      },
      {
        path: 'evaluaciones',
        component: EvaluacionesComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, CommonModule]
})
export class MecteRoutingModule { }
