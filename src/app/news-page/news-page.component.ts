import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from '../services/responsive.service';
import { CommonModule } from '@angular/common';
import { NewsService } from '../services/news.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NewsType } from '../types/news-type';

@Component({
  selector: 'app-news-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.scss'
})
export class NewsPageComponent implements OnInit {
  newsList: { [key: string]: NewsType } = {};
  ngOnInit(): void {
    this.news.get().subscribe(news => {
      this.newsList = { ...this.newsList, ...news };
      console.log(this.newsList);
    });
  }  

  constructor(public responsiveService: ResponsiveService, private news: NewsService) {  }
}
