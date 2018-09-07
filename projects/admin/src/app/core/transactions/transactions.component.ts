import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { TransactionsService } from '../../shared/services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  displayedColumns: string[] = ['back', 'status', 'time', 'amount', 'address'];
  transactions: any;
  transactionsList: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private transactionsService: TransactionsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe((params: ParamMap) => {
        const id = params.get('id');
        this.getAllTransactions(id);
      });
  }

  /**
   *  Получаем все логи
   */
  getAllTransactions(id: string): void {
    this.transactionsService.getAllTransactions(id)
      .subscribe((res) => {
        console.log('transactions', res);
        this.transactions = res ? res : [];
        this.transactionsList = this.transactions.length ? new MatTableDataSource(this.transactions.reverse()) : new MatTableDataSource([]);
        this.transactionsList.paginator = this.paginator;
        console.log(this.transactionsList);
      });
  }

  /**
   * Возврат назад
   */
  goBack(): void {
    this.router.navigate(['/']);
  }

}
