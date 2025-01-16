import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthResetPasswordComponent } from './auth-reset-password/auth-reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AuthComponent,
    SigninComponent,
    SignupComponent,
    AuthResetPasswordComponent,
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    AuthRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-left",
      preventDuplicates: true,
    })
  ]
})
export class AuthModule { }
