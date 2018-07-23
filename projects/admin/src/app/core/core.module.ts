import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { LayoutComponent } from './layout/layout.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [LayoutComponent, UsersComponent]
})
export class CoreModule { }
