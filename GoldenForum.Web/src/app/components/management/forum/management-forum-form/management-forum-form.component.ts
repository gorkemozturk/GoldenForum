import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-management-forum-form',
  templateUrl: './management-forum-form.component.html',
  styleUrls: ['./management-forum-form.component.css']
})
export class ManagementForumFormComponent implements OnInit {
  title: string = null;
  form: FormGroup;
  submitted: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data, private formBuilder: FormBuilder, private forumService: ForumService) { }

  ngOnInit() {
    this.forumInsertingForm();

    if (this.data.forum) {
      this.title = 'Forum Düzenle: ' + this.data.forum.title;
      this.forumUpdatingForm();
    }
    else {
      this.title = 'Yeni Forum Oluştur';
    }
  }

  forumInsertingForm(): void {
    this.form = this.formBuilder.group({
      categoryId: [this.data.categoryId, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imageUrl: [null, Validators.required]
    });
  }

  forumUpdatingForm(): void {
    this.form.addControl('id', new FormControl(this.data.forum.id));
    
    this.form.patchValue({
      title: this.data.forum.title,
      description: this.data.forum.description,
      imageUrl: this.data.forum.imageUrl
    });
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (this.form.invalid) { return; }

    if (this.data.forum) { 
      this.forumService.putResource(this.data.forum.id, form.value).subscribe(response => this.submitted = false);
    }
    else {
      this.forumService.postResource(form.value).subscribe(response => this.submitted = false);
    }
  }

}
