import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { PublicKeyCredentialCreationOptionsJSON, startAuthentication, startRegistration, type StartRegistrationOpts } from '@simplewebauthn/browser';
import { JsonPipe } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { UserType } from '../types/user-type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://dht-connect-api.vercel.app/api/";
  //apiUrl = "http://localhost:8080/api"
  isSucces: boolean | undefined;
  user: UserType | undefined | null;
  register(username: string | null | undefined): Observable<boolean> {
    const body = {
      username: username,
    }

    return new Observable<boolean>((observer) => {
      this.http.post<PublicKeyCredentialCreationOptionsJSON>(`${this.apiUrl}/register`, body).subscribe(async options => {
        let attResp;
        try {
          attResp = await startRegistration({ optionsJSON: options });
        } catch (error) {
          throw error;
        }
        this.http.post<any>(`${this.apiUrl}/register/verify/${options.challenge}`, { user: username, response: attResp }).subscribe(resp => {
          if (resp.error) {
            console.error(resp.error);
            observer.next(false);
            observer.complete();
          } else {
            this.user = {
              username: username || "no name",
              token: resp.token
            }
            observer.next(true);
            observer.complete();
          }
        })
      });
    })

  }

  login(username: string | null | undefined): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.get<PublicKeyCredentialCreationOptionsJSON>(`${this.apiUrl}/login/${username}`).subscribe(async options => {
        let asseResp;
        try {
          asseResp = await startAuthentication({ optionsJSON: options });
        } catch(error) {
          console.error(error);
          throw error;
        }
        this.http.post<any>(`${this.apiUrl}/login/verify/${username}/${options.challenge}`, asseResp).subscribe(resp => {
          if (resp.error) {
            console.error(resp.error);
            observer.next(false);
            observer.complete();
          } else {
            this.user = {
              username: username || "No Name",
              token: resp.token
            }
            observer.next(true);
            observer.complete();
          }
        });
      })
    });
  }

  private base64ToUint8Array(base64: string): Uint8Array {
    // Convertir Base64URL en Base64 standard (remplacement des caractères spécifiques)
    base64 = base64.replace(/-/g, '+').replace(/_/g, '/');

    // Ajouter des caractères "=" pour rendre la longueur divisible par 4
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }

    // Décoder la chaîne Base64 en une chaîne binaire brute
    const rawData = atob(base64);

    // Créer un Uint8Array à partir de la chaîne binaire brute
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }

  constructor(private http: HttpClient) { }
}
