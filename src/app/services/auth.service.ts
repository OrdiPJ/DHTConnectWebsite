import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { PublicKeyCredentialCreationOptionsJSON, startRegistration, type StartRegistrationOpts } from '@simplewebauthn/browser';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://dht-connect-api.vercel.app/api/register";
  isSucces: boolean | undefined;
  register(username: string | null | undefined) {
    const body = {
      username: username,
    }

    this.http.post<PublicKeyCredentialCreationOptionsJSON>("https://dht-connect-api.vercel.app/api/register", body).subscribe(async (options) => {
      let attResp;
      try {
        attResp = await startRegistration({ optionsJSON: options });
      } catch (error) {
        throw error;
      }
      return this.http.post<any>(`https://dht-connect-api.vercel.app/api/register/verify/${options.challenge}`, { user: username, response: attResp }).subscribe(resp => {
      });
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
