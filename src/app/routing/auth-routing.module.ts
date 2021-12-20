import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { LoginPageComponent } from '../common/lib/pages/login-page/login-page.component';
import { SignupPageComponent } from '../common/lib/pages/signup-page/signup-page.component';

const routes: Routes = [
    { path: 'login', component: LoginPageComponent, data: { tab: 9 }  },
    { path: 'signup', component: SignupPageComponent, data: { tab: 10 }  },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class AuthRoutingModule {}