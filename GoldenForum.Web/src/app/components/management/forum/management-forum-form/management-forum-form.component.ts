import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-management-forum-form',
  templateUrl: './management-forum-form.component.html',
  styleUrls: ['./management-forum-form.component.css']
})
export class ManagementForumFormComponent implements OnInit {
  title: string = 'Yeni Forum Oluştur';
  form: FormGroup;
  submitted: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data, private formBuilder: FormBuilder, private forumService: ForumService) { }

  ngOnInit() {
    this.forumForm();
  }

  forumForm(): void {
    this.form = this.formBuilder.group({
      categoryId: [this.data.categoryId, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imageUrl: [null, Validators.required]
    });
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (this.form.invalid) { return; }

    this.forumService.postResource(form.value).subscribe(response => {
      this.submitted = false;
      this.form.patchValue({
        title: null,
        description: null,
        imageUrl: null
      })
    });
  }

}
