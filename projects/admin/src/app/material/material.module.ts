import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatExpansionModule,
    MatListModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatExpansionModule,
    MatListModule
  ]
})
export class MaterialModule {}
