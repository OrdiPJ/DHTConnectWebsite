import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  post(title: string | undefined | null, content: string | undefined | null) {
    return this.http.post<any>("http://localhost:8080/api/post", {title: title, content: content, token : this.auth.user?.token})
  }

  get(lastId?: string | "0") {
    return this.http.get<any>(`http://localhost:8080/api/post/${lastId}`);
  }

  constructor(private http: HttpClient, private auth: AuthService) { }
}