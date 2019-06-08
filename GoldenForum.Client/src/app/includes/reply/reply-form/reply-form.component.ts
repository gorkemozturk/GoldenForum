import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.css']
})
export class ReplyFormComponent implements OnInit {
  title: string = 'Gönderiyi Cevapla';

  form: FormGroup;
  submitted: boolean = false;

  @Output() submission: EventEmitter<any> = new EventEmitter();
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.postForm();
  }

  postForm(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.form = this.formBuilder.group({
      body: [null, Validators.required],
      userId: [this.authService.currentUser.sub, Validators.required],
      postId: [id, Validators.required]
    });
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (this.form.invalid) { return; }

    this.submission.emit(form);
  }

}