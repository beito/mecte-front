import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControlDirective } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-reset-password',
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.scss']
})
export class AuthResetPasswordComponent implements OnInit {
  //@ts-ignore
  @ViewChild('emailForm') emailForm: FormControlDirective;
  //@ts-ignore
  @ViewChild('codeForm') codeForm: FormControlDirective;
  //@ts-ignore
  @ViewChild('passwordForm') passwordForm: FormControlDirective;

  public submitted: boolean = false;
  public loading: boolean = false;
  public view: number = 1;
  public data = {
    id: "",
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: ""
  }

  public alertMessage = {
    message: "",
    type: ""
  }

  constructor(
    private authService: AuthService, 
    private toastr: ToastrService, 
    private router: Router
  ) { }

  ngOnInit(): void { }

  requestRecoveryCode() {
    if (this.emailForm.valid) {
      this.setAlert();
      this.submitted = false;
      this.loading = true;
      const email = this.data.email;
      this.authService.requestRecoveryCode(email).subscribe(
        (response) => {
          this.data.id = response.id;
          this.view = 2;
          this.loading = false;
        },
        (error) => {
          this.toastr.error(error.error.message, "Operación no Válida");
          this.loading = false;
        },
      );
    } else {
      this.submitted = true;
    }
  }

  validateRecoveryCode() {
    if (this.codeForm.valid) {
      this.setAlert();
      this.submitted = false;
      this.loading = true;
      const email = this.data.email;
      const code = this.data.code.toUpperCase();
      this.loading = false;
      this.authService.validateRecoveryCode(email, code).subscribe(
        (response) => {
          this.view = 3;
          this.loading = false;
        },
        (error) => {
          this.toastr.error(error.error.message, "Operación no Válida");
          this.loading = false;
        }
      );
    } else {
      this.submitted = true;
    }
  }

  requestChangePassword() {
    if (this.passwordForm.valid && (this.data.newPassword && this.data.confirmPassword && this.data.newPassword == this.data.confirmPassword)) {
      this.setAlert();
      this.submitted = false;
      this.loading = true;
      const emailPayload = {
        user_email: this.data.email,
        restoreCode: this.data.code.toUpperCase(),
        password: this.data.newPassword,
      };
      this.loading = false;
      this.authService.requestPasswordChange(emailPayload).subscribe(
        response => {
          this.view = 4;
          this.loading = false;
          this.data = {
            id: "",
            email: "",
            code: "",
            newPassword: "",
            confirmPassword: ""
          }
        },
        error => {
          this.toastr.error(error.error.message, "Operación no Válida");
          this.loading = false;
        }
      );
    } else {
      this.submitted = true;
      if (this.data.newPassword && this.data.confirmPassword && !this.passwordForm.valid) {
        this.toastr.error("Se esperaban al menos 8 caracteres, una mayúscula, una minúscula y un número.", "Operación no Válida");
      } else if (this.data.newPassword && this.data.confirmPassword && this.data.newPassword != this.data.confirmPassword) {
        this.toastr.error("Las contraseñas no coinciden.", "Operación no Válida");
      }
    }
  }

  setAlert(type: string = "", message: string = "") {
    this.alertMessage = {
      message: message,
      type: type
    }
  }
}
