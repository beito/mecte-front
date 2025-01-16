// Angular Import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PipesService } from './shared/pipes/pipes.service';
import { SocketIoModule } from 'ngx-socket-io';
import { config } from './socket-config';
import { ReadExcelFileService } from './services/readExcelFileService/read-excel-file.service';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    NgbModule,
    FormsModule, 
    ReactiveFormsModule, 
    BrowserAnimationsModule, 
    HttpClientModule,
    NgxPaginationModule,
    SharedModule,
    TextMaskModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-left",
      preventDuplicates: true,
    }),
    ModalModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    PipesService,
    ReadExcelFileService,
    {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}