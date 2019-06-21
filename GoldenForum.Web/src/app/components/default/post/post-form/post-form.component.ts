import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { Forum } from 'src/app/models/forum';
import { ForumService } from 'src/app/services/forum.service';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  title: string = 'Yeni Gönderi Oluştur';

  form: FormGroup;
  submitted: boolean = false;
  
  forum: Forum = new Forum();
  
  constructor(
    private forumService: ForumService, 
    private postService: PostService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private authService: AuthService) { }

  ngOnInit() {
    this.postForm();
  }

  postForm(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.form = this.formBuilder.group({
      userId: [this.authService.currentUser.sub, Validators.required],
      forumId: [id, Validators.required],
      title: [null, Validators.required],
      body: [null, Validators.required],
      variety: [1, Validators.required]
    });

    this.forumService.getResource(id).subscribe(response => this.forum = response);
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (this.form.invalid) { return; }
    
    this.postService.postResource(form.value).subscribe(response => this.router.navigate(['/post/' + response.slug + '/' + response.id]));
  }

}
