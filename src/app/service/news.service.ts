import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../interface/response.interface'
import { map, Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { News } from '../interface/news.interface';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private readonly apiUrl = 'http://api.mediastack.com/v1'
  private readonly apiKey = 'fd4cb43d5bd893b490c79f89d668827d'
  
  private readonly sortOptions = [
    {name:'Descend', value:'published_desc'},
    {name:'Ascend', value:'published_asc'},
    {name:'Popular', value:'popularity'}
  ]
  private readonly categories = [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology'
  ]

  constructor(private http: HttpClient) {}
 
  getResponse(
    category: string,
    sort: string,
    keyword: string
    ): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/news`,
      {
        params: new HttpParams()
          .set('access_key', this.apiKey)
          .set('languages', 'en')
          .set('countries', 'ph')
          .set('sort', sort)
          .set('keywords', keyword)
          .set('date', this.dateToday())
          .set('categories', this.specifiedCategory(category))
          
      }).pipe(map(this.newsFormat))
  }

  public onGetSortOptions() {
    return this.sortOptions
  }

  public set newsDetailData(value:any) {
    localStorage.setItem('news-items', JSON.stringify(value))
  }

  public get newsDetailData() {
    return JSON.parse(localStorage.getItem('news-items')!)
  }

  onGetNewsById(id: string): Observable<any> {
    const getNews = this.newsDetailData.filter((n: any) => n.id === id)
    return of(getNews)
  }

  private newsFormat(response: Response): Response {
    return {
      pagination: { ...response.pagination },
      data: response.data.map((news: any) => (<News>{
        id: uuidv4(),
        title: news.title,
        author: news.author,
        description: news.description,
        source: news.source,
        url: news.url,
        imgUrl: news.image,
        category: news.category,
        published: news.published_at
      }))
    }
  }

  private specifiedCategory(category: string): string {
    const excludedCategory = this.categories
      .filter(c => c !== category)
      .map(c => `-${c}`)
      .join(',')

    return (`${category},${excludedCategory}`)
  }

  private dateToday(): string {
    const today = new Date()
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  }
}
