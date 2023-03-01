import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'News App'

  constructor(private router: Router) {}

  getKeyword(keyword: string) {
    this.router.navigate(['/news/general'], {queryParams: {keyword: keyword}})
  }

}
