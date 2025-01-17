import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from '../services/responsive.service';
import { CommonModule } from '@angular/common';
import { NewsService } from '../services/news.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NewsType } from '../types/news-type';

@Component({
    selector: 'app-news-page',
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule
    ],
    templateUrl: './news-page.component.html',
    styleUrl: './news-page.component.scss'
})
export class NewsPageComponent implements OnInit {
  lastIndex = 1;
  newsList: Array<NewsType> = [];
  scrollObserver = document.querySelector('.scroll-observer');
  observer = new IntersectionObserver((entries, observer) =>{
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("visible")
        //observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 1,
  });

  ngOnInit(): void {
    this.news.get().subscribe(news => {
      console.log(news);
      this.newsList = news.posts;
      console.log(this.newsList);
      this.lastIndex++;
      console.log(this.newsList);
      if (this.scrollObserver) {
        this.observer.observe(this.scrollObserver)
      }
    });
    window.addEventListener('scroll', () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        this.news.get(this.lastIndex).subscribe(news=> {
          console.log(news);
          this.newsList = this.newsList.concat(news.posts);
          console.log(this.newsList);
          this.lastIndex++;
        });
      }
    });
  }  

  constructor(public responsiveService: ResponsiveService, private news: NewsService) {  }
}
