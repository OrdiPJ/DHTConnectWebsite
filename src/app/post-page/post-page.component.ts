import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ResponsiveService } from '../services/responsive.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-post-page',
  standalone: true,
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
export class PostPageComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  submit() {
    this.authService.register(this.username?.value);
  }

  get username() {
    return this.loginForm.get('username');
  }

  constructor(public responsiveService: ResponsiveService, private authService: AuthService) {  }
}
