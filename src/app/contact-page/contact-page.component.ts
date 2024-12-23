import { Component, inject } from '@angular/core';
import { ResponsiveService } from '../services/responsive.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MailService } from '../services/mail.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-contact-page',
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
    ],
    templateUrl: './contact-page.component.html',
    styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
    subject: new FormControl('', [Validators.required, Validators.minLength(3)]),
    message: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  //isSucces: boolean | undefined;
  private _snackBar = inject(MatSnackBar);

  submit() {
    console.log("Submit");

    this.mailService.sendMail(this.name?.value, this.firstName?.value, this.email?.value, this.subject?.value, this.message?.value).subscribe(isSuccess => {
      if (isSuccess) {
        this._snackBar.open("Message envoyé avec succes.", "Fermer");
        this.contactForm.reset();
      } else {
        this._snackBar.open("Une erreur s'est produite. Veuillez réessayer.", "Fermer");
      }
    });
  }

  get name() {
    return this.contactForm.get('name');
  }

  get firstName() {
    return this.contactForm.get('firstName');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get subject() {
    return this.contactForm.get('subject');
  }

  get message() {
    return this.contactForm.get('message');
  }

  constructor(public responsiveService: ResponsiveService, private mailService: MailService) { }
}
