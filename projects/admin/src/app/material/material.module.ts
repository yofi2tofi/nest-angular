import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class MaterialModule {}
