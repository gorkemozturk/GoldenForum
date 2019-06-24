import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-entry-report-form',
  templateUrl: './post-entry-report-form.component.html',
  styleUrls: ['./post-entry-report-form.component.css']
})
export class PostEntryReportFormComponent implements OnInit {
  postForm: FormGroup;
  submitted: boolean;
  
  constructor(@Inject(MAT_DIALOG_DATA) private data, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.postReportForm();
    this.replyReportForm();
  }

  postReportForm(): void {
    this.postForm = this.formBuilder.group({
      postId: [this.data.entry.id, Validators.required],
      title: [null, Validators.required],
      body: [null, Validators.required]
    });
  }

  replyReportForm(): void {
    this.postForm = this.formBuilder.group({
      replyId: [this.data.entry.id, Validators.required],
      title: [null, Validators.required],
      body: [null, Validators.required]
    });
  }

  get postField() { return this.postForm.controls; }
  get replyField() { return this.postForm.controls; }

}
