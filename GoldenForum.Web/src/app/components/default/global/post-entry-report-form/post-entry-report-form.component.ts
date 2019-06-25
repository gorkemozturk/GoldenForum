import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { PostReportService } from 'src/app/services/post-report.service';
import { ReplyReportService } from 'src/app/services/reply-report.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-entry-report-form',
  templateUrl: './post-entry-report-form.component.html',
  styleUrls: ['./post-entry-report-form.component.css']
})
export class PostEntryReportFormComponent implements OnInit {
  postForm: FormGroup;
  replyForm: FormGroup;
  submitted: boolean;
  titles: string[] = [];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private data, 
    private formBuilder: FormBuilder, 
    private postReportService: PostReportService, 
    private replyReportService: ReplyReportService,
    private authService: AuthService) { }

  ngOnInit() {
    this.postReportForm();
    this.replyReportForm();

    this.titles = [
      "Hakaret",
      "Irkcılık",
      "Pornografik İçerik",
      "İstenmeyen Gönderi / Mesaj",
      "Dolaylı Reklam"
    ]
  }

  postReportForm(): void {
    this.postForm = this.formBuilder.group({
      postId: [this.data.entry.id, Validators.required],
      userId: [this.authService.currentUser.sub, Validators.required],
      title: [null, Validators.required],
      body: [null, Validators.required]
    });
  }

  replyReportForm(): void {
    this.replyForm = this.formBuilder.group({
      replyId: [this.data.entry.id, Validators.required],
      userId: [this.authService.currentUser.sub, Validators.required],
      title: [null, Validators.required],
      body: [null, Validators.required]
    });
  }

  get postReportField() { return this.postForm.controls; }
  get replyReportField() { return this.replyForm.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (this.postForm.invalid && this.replyForm.invalid) { return; }

    if (this.data.entry.replies) {
      this.postReportService.postResource(form.value).subscribe(response => console.log('Gönderi şikayeti kaydedildi.'));
    }
    else {
      this.replyReportService.postResource(form.value).subscribe(response => console.log('Gönderi şikayeti kaydedildi.'));
    }
  }

}
