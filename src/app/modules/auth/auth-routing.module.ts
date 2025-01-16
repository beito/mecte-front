import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthResetPasswordComponent } from './auth-reset-password/auth-reset-password.component';
import { AuthComponent } from "./auth.component";

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '',
                redirectTo: 'signin',
                pathMatch: 'full'
            },
            {
                path: 'signin',
                component: SigninComponent
            },
            {
                path: 'signup',
                component: SignupComponent
            },
            {
                path: 'restarpass',
                component: AuthResetPasswordComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }