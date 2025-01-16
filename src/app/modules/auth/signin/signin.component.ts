import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  emailValue = '';
  userPassword = '';

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  classList!: { toggle: (arg0: string) => void };

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authenticationService: AuthService
  ) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['auth/signin']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');

    togglePassword?.addEventListener('click', () => {
      const type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
      password?.setAttribute('type', type);
      this.classList.toggle('icon-eye-off');
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.toastr.error("El usuario o la Contraseña son incorrectos.", "Operación no Válida");
        this.loading = false;
      }
    });
  }
}
