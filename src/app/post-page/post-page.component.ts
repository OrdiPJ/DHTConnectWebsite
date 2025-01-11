import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ResponsiveService } from '../services/responsive.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
    selector: 'app-post-page',
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    templateUrl: './post-page.component.html',
    styleUrl: './post-page.component.scss'
})
export class PostPageComponent implements OnInit, AfterViewInit {
  private _snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  submit() {
    this.authService.login(this.username?.value, false).subscribe(succes => {
      if (succes) {
        console.log(this.authService.user)
        const dialogRef = this.dialog.open(DialogComponent);
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result : ${result}`);
        });
      } else {
        this._snackBar.open("Une erreur s'est produite lors de la connection", "Fermer");
      }
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  ngOnInit(): void {
    this.authService.login("", true).subscribe(succes => {
      if (succes) {
        console.log(this.authService.user);
        const dialogRef = this.dialog.open(DialogComponent);
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result : ${result}`);
        });
      } else {
        this._snackBar.open("Une erreur s'est produite lors de la connection", "Fermer");
      }
    })
  }

  constructor(public responsiveService: ResponsiveService, private authService: AuthService) {  }
  ngAfterViewInit(): void {
    console.log(this.username?.value);
  }
}
