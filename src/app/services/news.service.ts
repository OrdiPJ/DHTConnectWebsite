import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { NewsType } from '../types/news-type';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  apiUrl = "https://dht-connect-api.vercel.app/api/post";
  //apiUrl = "http://localhost:8080/api/post";
  post(title: string | undefined | null, imageURL: string | undefined | null, content: string | undefined | null) {
    return this.http.post<any>(this.apiUrl, {title: title, imageURL: imageURL, content: content, token : this.auth.user?.token})
  }

  get(lastId?: number | 0) {
    return this.http.get<any>(`${this.apiUrl}/${lastId}`);
  }

  constructor(private http: HttpClient, private auth: AuthService) { }
}
