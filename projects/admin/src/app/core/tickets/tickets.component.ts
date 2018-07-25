import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators/first';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  tickets: any[];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getAllTickets()
      .pipe(first())
      .subscribe((val) => {
        console.log(val);
        this.tickets = val;
      });
  }

  /**
   * Получаем все логи
   */
  public getAllTickets(): Observable<any> {
    return this.http.get(['api/tickets/all'].join(''));
  }
}
