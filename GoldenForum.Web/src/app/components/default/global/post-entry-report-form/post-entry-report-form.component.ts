import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { PostReportService } from 'src/app/services/post-report.service';
import { ReplyReportServic } from 'src/app/services/reply-report.service';

@Component({
  selector: 'app-post-entry-report-form',
  templateUrl: './post-entry-report-form.component.html',
  styleUrls: ['./post-entry-report-form.component.css']
})
export class PostEntryReportFormComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;
  titles: string[] = [];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private data, 
    private formBuilder: FormBuilder, 
    private postReportService: PostReportService, 
    private replyReportService: ReplyReportServic) { }

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
    this.form = this.formBuilder.group({
      postId: [this.data.entry.id, Validators.required],
      title: [null, Validators.required],
      body: [null, Validators.required]
    });
  }

  replyReportForm(): void {
    this.form = this.formBuilder.group({
      replyId: [this.data.entry.id, Validators.required],
      title: [null, Validators.required],
      body: [null, Validators.required]
    });
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (this.field.invalid) { return; }

    if (this.data.entry.replies) {
      this.postReportService.postResource(form.value).subscribe(response => console.log(true));
    }
    else {
      this.replyReportService.postResource(form.value).subscribe(response => console.log(true));
    }
  }

}
