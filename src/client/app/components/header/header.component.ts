import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ISection {
  title: string;
  link: string;
}

interface INav {
  root: ISection;
  sections: ISection[];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  nav: INav = {
    root: {title: 'Recipe Book', link: 'recipes'},
    sections: [
      {title: 'Recipes', link: 'recipes'},
      {title: 'Shopping List', link: 'shopping-list'}
    ]
  };

  constructor(
    private readonly httpClient: HttpClient
  ) {
    httpClient.get('api/payment')
      .subscribe((res) => console.log(res));
  }

  ngOnInit() {
  }
}
