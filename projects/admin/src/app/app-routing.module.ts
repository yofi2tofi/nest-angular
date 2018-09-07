import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/services/guard.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './core/layout/layout.component';
import { UsersComponent } from './core/users/users.component';
import { LogsComponent } from './core/logs/logs.component';
import { TransactionsComponent } from './core/transactions/transactions.component';
import { TicketsComponent } from './core/tickets/tickets.component';

const routes: Routes = [{
  path: '',
  component: AppComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    component: LayoutComponent,
    children: [{
      path: '',
      component: UsersComponent
    }, {
      path: 'logs/:id',
      component: LogsComponent
    }, {
      path: 'transactions/:id',
      component: TransactionsComponent
    }, {
      path: 'tickets',
      component: TicketsComponent
    }]
  }]
}, {
  path: 'authorization',
  component: LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
