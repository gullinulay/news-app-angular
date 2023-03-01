import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsDetailsComponent } from './component/news-details/news-details.component';
import { NewsComponent } from './component/news/news.component';

const routes: Routes = [
  { path: 'news/:category', component: NewsComponent },
  { path: 'news/:category/details/:id', component:NewsDetailsComponent },
  { path: '**', redirectTo: '/news/general', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
