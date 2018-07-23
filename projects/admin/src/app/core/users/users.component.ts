import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { first } from 'rxjs/operators';

import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  users: MatTableDataSource<any>;
  displayedColumns: string[] = ['email', 'current', 'income', 'outcome'];

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.usersService.getAll()
      .pipe(first())
      .subscribe((res) => {
        console.log(res);
        this.initDataSource(res);
      });
  }

  /**
   * Ставит дату и метод сортировки для таблицы
   */
  initDataSource(val: any): void {
    this.users = new MatTableDataSource([...val]);
    console.log(this.sort);
    this.users.sortingDataAccessor = (item, property) => {
      console.log(item, property);
      switch (property) {
        case 'project.name': return item.project.name;
        default: return item[property];
      }
    };
    this.users.sort = this.sort;
  }

}
