import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';

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
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.postForm();
  }

  postForm(): void {
    this.form = this.formBuilder.group({
      body: [null, Validators.required]
    });
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm) {
    this.submission.emit(form);
  }

}
