import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { News } from 'src/app/interface/news.interface';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit, OnDestroy {

  newsData!: News[]
  newsDetailSubscription!: Subscription
  
  constructor(private activatedRoute: ActivatedRoute, private newsService: NewsService ) {}
  
  
  ngOnDestroy(): void {
    this.newsDetailSubscription.unsubscribe()
  }
  
  ngOnInit(): void {
    this.newsDetailSubscription = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.newsService.onGetNewsById(params.get('id')!).subscribe(
        (data: any) => this.newsData = data
      )
    })
  }


}
