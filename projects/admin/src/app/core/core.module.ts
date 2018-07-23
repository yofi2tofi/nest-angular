import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';

import { LayoutComponent } from './layout/layout.component';
import { UsersComponent } from './users/users.component';
import { LogsComponent } from './logs/logs.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [LayoutComponent, UsersComponent, LogsComponent]
})
export class CoreModule { }
