import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { first } from 'rxjs/operators';

import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: MatTableDataSource<any>;
  displayedColumns: string[] = ['email', 'current', 'income', 'outcome'];

  constructor(
    private usersService: UsersService,
    private router: Router
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
  }

  /**
   * Получение логов пользователя
   *
   * @param id
   */
  onOpenLogs(id: string): void {
    this.router.navigate(['/logs', id]);
  }
}
