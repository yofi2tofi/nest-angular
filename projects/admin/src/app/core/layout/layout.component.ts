import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { LayoutService } from '../../shared/services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  users: any[];

  constructor(
    private layoutService: LayoutService
  ) { }

  ngOnInit() {

  }

}
