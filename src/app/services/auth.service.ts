import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://dht-connect-api.vercel.app/api/register";
  isSucces: boolean | undefined;
  register(username: string | null | undefined) {
    const body = {
      user: username
    }
    this.http.post<any>(this.apiUrl, body).subscribe(response => {
      if (!window.PublicKeyCredential) {

      } else {
        navigator.credentials.create({ publicKey: response })
        .then(function(newCredentialInfo) {
          
        })
        .catch(function (err) {

        });
      }
    });
  }

  constructor(private http: HttpClient) { }
}
