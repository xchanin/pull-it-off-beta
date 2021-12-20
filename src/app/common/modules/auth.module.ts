import { AuthRoutingModule } from './../../routing/auth-routing.module';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@lcu/common';
import { SignupComponent } from './../lib/controls/auth/signup/signup.component';
import { LoginComponent } from './../lib/controls/auth/login/login.component';
import { LoginPageComponent } from "../lib/pages/login-page/login-page.component";
import { SignupPageComponent } from "../lib/pages/signup-page/signup-page.component";

@NgModule({
   declarations: [
       LoginComponent,
       SignupComponent,
       LoginPageComponent,
       SignupPageComponent,
   ],
   imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AuthRoutingModule
   ] 
})

export class AuthModule {}