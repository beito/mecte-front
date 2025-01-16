import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

    ngOnInit() {
      this.signupForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmpassword: ['', Validators.required]
      });
    }

    get formValues() { return this.signupForm.controls; }

    onSubmit() {
      this.submitted = true;
      if (this.signupForm.invalid) {
        return;
      }
      const register = {
        name: this.formValues.name.value, 
        user_email: this.formValues.email.value, 
        password: this.formValues.password.value,
        confirm_password: this.formValues.confirmpassword.value
      };
      this.authService.register(register).subscribe({
        next: (response: any) => {
          if (response.valid) {
            this.toastr.success(response.message, "Usuario Registrado");
            this.router.navigate(['/auth/signin']);
          } else {
            this.toastr.error(response.message, "Operación no Válida");
            this.loading = false;
          }
        },
        error: (error) => {
          this.toastr.error(error.error.message, "Operación no Válida");
          this.loading = false;
        }
      });
      this.loading = true;
    }

}
