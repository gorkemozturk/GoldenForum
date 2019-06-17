import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.css']
})
export class ReplyFormComponent implements OnInit {
  title: string = 'Hızlı Cevap';
  form: FormGroup;
  submitted: boolean = false;
  @Output() submission: EventEmitter<any> = new EventEmitter();
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.replyForm();
  }

  replyForm(): void {
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
    
    this.submitted = false;
    this.submission.emit(form);
    this.form.patchValue({ body: null });
  }

}
