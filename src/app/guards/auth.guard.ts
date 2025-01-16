import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

export const canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) => {
	const subDomain: string = state.url;
	const router = inject(Router);
	const authService = inject(AuthService);
	if (authService.getSession().valid) {
		if (subDomain.includes('/auth')) {
			return router.parseUrl('/home');
		}
	} else {
		if (subDomain.includes('/home')) {
			return router.parseUrl('/signin');
		}
	}
	return true;
}