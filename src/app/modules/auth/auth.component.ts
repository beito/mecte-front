import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public logged = false;

  constructor(private router: Router, private authService: AuthService) {
    this.logged = !!authService.getSession().valid;
  }

  registerClick() {
    this.router.navigate(['/auth/signup']);
  }

  loginClick() {
    this.router.navigate(['/auth/signin']);
  }
}
