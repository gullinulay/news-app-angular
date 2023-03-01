//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
//Routing
import { AppRoutingModule } from './app-routing.module';
//Components
import { AppComponent } from './app.component';
import { NewsComponent } from './component/news/news.component';
import { NewsDetailsComponent } from './component/news-details/news-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
