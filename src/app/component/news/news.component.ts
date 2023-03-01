import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Response } from 'src/app/interface/response.interface';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {

  private newsResponse!: Response
  private category!: string
  private searchKeyword!: string
  private sortValue!: string
  private responseSubscription!: Subscription
  private categorySubscription!: Subscription
  private sortSubscription!: Subscription
  private keywordSubscription!: Subscription
  sortDefault: string = this.newsService.onGetSortOptions()[2].value

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
   
    this.getResponseByKeyword()
    this.getResponseByCategory()
    this.getResponseBySort()

  }

  ngOnDestroy(): void {
    this.responseSubscription.unsubscribe()
    this.categorySubscription.unsubscribe()
    this.sortSubscription.unsubscribe()
    this.keywordSubscription.unsubscribe()
  }


  public getCategory() {
    return this.category
  }

  public getNewsResponse() {
    return this.newsResponse
  }
  public getSortOptions() {
    return this.newsService.onGetSortOptions()
  }

  private getResponse(category: string, sort: string, keyword: string) {
    this.responseSubscription = this.newsService.getResponse(this.category, this.sortDefault, this.searchKeyword).subscribe(
      (res) => {
        this.newsResponse = res;
        this.newsService.newsDetailData = this.newsResponse.data
      }
    )
  }

  private getResponseByCategory() {
    this.categorySubscription = this.route.paramMap.subscribe(param => {
      if (this.category !== param.get('category')!) {
        this.category = param.get('category')!
        this.sortDefault = 'popularity'
        this.sortValue = this.sortDefault
        this.searchKeyword = ''
        this.getResponse(this.category, this.sortValue, this.searchKeyword)
      }
    })
  }

  private getResponseBySort() {
    this.sortSubscription = this.route.queryParamMap.subscribe((param) => {
      const sortOption = this.getSortOptions().filter(s => s.value === param.get('sort')!)
      if (this.sortValue !== this.sortDefault && sortOption.length > 0) {
        this.sortValue = !param.get('sort') ? 'popularity' : param.get('sort')!
        this.getResponse(this.category, this.sortValue, this.searchKeyword)
      }
    })
  }

  private getResponseByKeyword() {
    this.keywordSubscription = this.route.queryParamMap.subscribe((param) => {
      if (param.get('keyword')) {
        this.searchKeyword = param.get('keyword')!
        this.getResponse(this.category, this.sortValue, this.searchKeyword)
      }
    })
  }
}
