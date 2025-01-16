import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgxPaginationModule } from 'ngx-pagination';
import { ArchwizardModule } from 'angular-archwizard';
import { TextMaskModule } from 'angular2-text-mask';
import { TagInputModule } from 'ngx-chips';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import { MecteRoutingModule } from './mecte-routing.module';//si
import { NavBarComponent } from 'src/app/modules/components/nav-bar/nav-bar.component';//?
import { NavSearchComponent } from 'src/app/modules/components/nav-bar/nav-left/nav-search/nav-search.component';//?
import { NavLeftComponent } from 'src/app/modules/components/nav-bar/nav-left/nav-left.component';//?
import { NavRightComponent } from 'src/app/modules/components/nav-bar/nav-right/nav-right.component';//?
import { NavCollapseComponent } from 'src/app/modules/components/navigation/nav-content/nav-collapse/nav-collapse.component';//?
import { NavGroupComponent } from 'src/app/modules/components/navigation/nav-content/nav-group/nav-group.component';//?
import { NavItemComponent } from 'src/app/modules/components/navigation/nav-content/nav-item/nav-item.component';//?
import { NavigationComponent } from 'src/app/modules/components/navigation/navigation.component';//?
import { FriendComponent } from 'src/app/modules/components/nav-bar/nav-right/chat-user-list/friend/friend.component';//?
import { ChatUserListComponent } from 'src/app/modules/components/nav-bar/nav-right/chat-user-list/chat-user-list.component';//?
import { MecteComponent } from './mecte.component';//si
import { ConfigurationComponent } from 'src/app/modules/components/configuration/configuration.component';//?
import { NavContentComponent } from 'src/app/modules/components/navigation/nav-content/nav-content.component';//?
import { SharedModule } from '../../shared/shared.module';//?
import { ChatMsgComponent } from 'src/app/modules/components/nav-bar/nav-right/chat-msg/chat-msg.component';//?

import { ActividadesComponent } from './actividades/frontpage/actividades.component';
import { ActividadFormComponent } from './actividades/form/actividades-form.component';
import { AsignaturasComponent } from './asignaturas/frontpage/asignaturas.component';
import { AsignaturaFormComponent } from './asignaturas/form/asignaturas-form.component';
import { CarrerasComponent } from './carreras/frontpage/carreras.component';
import { CarreraFormComponent } from './carreras/form/carreras-form.component';
import { CompetenciasComponent } from './competencias/frontpage/competencias.component';
import { CompetenciasFormComponent } from './competencias/form/competencias-form.component';
import { DecanosComponent } from './decanos/frontpage/decanos.component';
import { DecanoFormComponent } from './decanos/form/decanos-form.component';
import { FacultadesComponent } from './facultades/frontpage/facultades.component';
import { FacultadFormComponent } from './facultades/form/facultades-form.component';
import { PeriodosAcademicosComponent } from './periodos-academicos/frontpage/periodos-academicos.component';
import { PeriodoAcademicoFormComponent } from './periodos-academicos/form/periodos-academicos-form.component';
import { ProcesosMejoraComponent } from './procesos-mejora/frontpage/procesos-mejora.component';
import { ProcesoMejoraFormComponent } from './procesos-mejora/form/procesos-mejora-form.component';
import { SeguimientosComponent } from './seguimientos/frontpage/seguimientos.component';
import { SeguimientoFormComponent } from './seguimientos/form/seguimientos-form.component';
import { SubCompetenciasComponent } from './sub-competencias/frontpage/sub-competencias.component';
import { SubCompetenciasFormComponent } from './sub-competencias/form/sub-competencias-form.component';
import { EvaluacionesComponent } from './evaluaciones/frontpage/evaluaciones.component';
import { EvaluacionesFormComponent } from './evaluaciones/form/evaluaciones-form.component';

import { AuthModule } from '../auth/auth.module';//si
import { FileUploadModule } from '@iplab/ngx-file-upload';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'boostrap',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 99999
  }
};

@NgModule({
  declarations: [
    NavBarComponent,
    NavSearchComponent,
    NavLeftComponent,
    NavRightComponent,
    NavContentComponent,
    NavCollapseComponent,
    NavGroupComponent,
    NavItemComponent,
    NavigationComponent,
    FriendComponent,
    ChatUserListComponent,
    ChatMsgComponent,
    MecteComponent,
    ConfigurationComponent,
    ActividadesComponent,
    ActividadFormComponent,
    AsignaturasComponent,
    AsignaturaFormComponent,
    CarrerasComponent,
    CarreraFormComponent,
    CompetenciasComponent,
    CompetenciasFormComponent,
    DecanosComponent,
    DecanoFormComponent,
    FacultadesComponent,
    FacultadFormComponent,
    PeriodosAcademicosComponent,
    PeriodoAcademicoFormComponent,
    ProcesosMejoraComponent,
    ProcesoMejoraFormComponent,
    SeguimientosComponent,
    SeguimientoFormComponent,
    SubCompetenciasComponent,
    SubCompetenciasFormComponent,
    EvaluacionesComponent,
    EvaluacionesFormComponent
  ],
  imports: [
    TagInputModule,
    CommonModule,
    MecteRoutingModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule,
    AuthModule,
    ArchwizardModule,
    TextMaskModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  exports: [
    //@ts-ignore
    NotifierModule.withConfig(customNotifierOptions),
  ],
  providers:[
    
  ]
})
export class MecteModule { }
