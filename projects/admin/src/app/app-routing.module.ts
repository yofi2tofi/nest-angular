import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/services/guard.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [{
  path: '',
  component: AppComponent,
  canActivate: [AuthGuard]
}, {
  path: 'authorization',
  component: LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
