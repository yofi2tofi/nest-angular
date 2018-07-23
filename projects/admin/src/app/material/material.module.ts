import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class MaterialModule {}
