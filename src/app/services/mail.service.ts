import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  apiUrl = "https://dht-connect-api.vercel.app/api/contact"
  isSucces: boolean | undefined;

  sendMail(name: string | null | undefined, firstName: string | null | undefined, email: string | null | undefined, subject: string | null | undefined, message: string | null | undefined): Observable<boolean> {
    const mail = {
      name: name,
      firstname: firstName,
      email: email,
      subject: subject,
      message: message + "\nRépondre à " + email
    };
    return this.httpService.post(this.apiUrl, mail)
  }
  constructor(private httpService: HttpService) { }
}
