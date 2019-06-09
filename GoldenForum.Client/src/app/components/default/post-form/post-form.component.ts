import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/models/forum';
import { ForumService } from 'src/app/services/forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import 'quill-emoji/dist/quill-emoji.js'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  title: string = null;

  form: FormGroup;
  submitted: boolean = false;
  
  forum: Forum = new Forum();

  postId: any = null;

  modules: any = null;

  constructor(
    private forumService: ForumService, 
    private postService: PostService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private authService: AuthService) { 
      this.modules = environment.modules;
    }

  ngOnInit() {
    this.getForum();
    this.postForm();

    this.postId = this.route.snapshot.paramMap.get('postId');
    
    if (this.postId) {
      this.postService.getResource(this.postId).subscribe(response => {
        this.postUpdatingForm(response);
        this.title = 'Gönderiyi Düzenle: ' + response.title;
      });
    }
    else {
      this.title = 'Yeni Gönderi Oluştur';
    }
  }

  getForum(): void {
    const id = this.route.snapshot.paramMap.get('forumId');
    this.forumService.getResource(id).subscribe(response => this.forum = response);
  }

  postForm(): void {
    const id = this.route.snapshot.paramMap.get('forumId');

    this.form = this.formBuilder.group({
      userId: [this.authService.currentUser.sub, Validators.required],
      forumId: [id, Validators.required],
      title: [null, Validators.required],
      body: [null, Validators.required]
    });
  }

  postUpdatingForm(post: Post): void {
    this.form.addControl('id', new FormControl(post.id));
    this.form.addControl('postedAt', new FormControl(post.postedAt));

    this.form.patchValue({
      title: post.title,
      body: post.body
    });
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (this.form.invalid) { return; }

    const forumId = this.route.snapshot.paramMap.get('forumId');
    
    if (!this.postId)
      this.postService.postResource(form.value).subscribe(response => this.router.navigate(['/post/' + response.id + '/detail']));
    else
      this.postService.putResource(this.postId, form.value).subscribe(response => this.router.navigate(['/post/' + this.postId + '/detail']));
  }

}
