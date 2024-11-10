import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  isSucces: boolean | undefined
  post(url: string, body: Object): Observable<boolean> {
    return this.http.post<Object>(url, body, { observe: 'response' }).pipe(
      map(response => {
        return response.status === 200;
      }),
      catchError(error => {
        console.error("Erreur lors de l'envoi du mail : ", error)
        return of(false);
      })
    );
  };
  constructor(private http: HttpClient) { }
}
