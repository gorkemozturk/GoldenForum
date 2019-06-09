import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { NgForm } from '@angular/forms';
import { ReplyService } from 'src/app/services/reply.service';
import { Reply } from 'src/app/models/reply';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post = new Post();

  constructor(private postService: PostService, private route: ActivatedRoute, private resplyService: ReplyService, private authService: AuthService) { }

  ngOnInit() {
    this.getPost();
  }

  getPost(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.getResource(id).subscribe(response => this.post = response);
  }

  onSubmit(form: NgForm): void {
    this.resplyService.postResource(form.value).subscribe(response => {
      const reply: Reply = { 
        id: response.id, 
        repliedAt: response.repliedAt, 
        body: response.body, 
        authorUserName: this.authService.currentUser.unique_name, 
        authorImageUrl: this.authService.currentUser.image_url, 
        authorRating: this.authService.currentUser.rating, 
        authorId: response.userId 
      }

      this.post.replies.push(reply);
    });
  }

}
