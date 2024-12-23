import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';

@Component({
    selector: 'app-dialog',
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  postForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    content: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  submit() {
    console.log(this.postForm.value)
    this.news.post(this.title?.value, this.content?.value).subscribe(resp => {
      console.log(resp);
    })
  }

  get title() {
    return this.postForm.get('title');
  }

  get content() {
    return this.postForm.get('content')
  }

  constructor(public auth: AuthService, private news: NewsService) { }
}
