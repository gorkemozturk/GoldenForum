import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ReplyService } from 'src/app/services/reply.service';
import { Reply } from 'src/app/models/reply';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post = new Post();

  constructor(private postService: PostService, private route: ActivatedRoute, private replyService: ReplyService, private authService: AuthService) { }

  ngOnInit() {
    this.getPostWithReplies();
  }

  getPostWithReplies() {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.getResource(id).subscribe(response => this.post = response);
  }

  onSubmit(form: NgForm): void {
    this.replyService.postResource(form.value).subscribe(response => {
      const reply: Reply = { 
        id: response.id, 
        repliedAt: response.repliedAt, 
        body: response.body, 
        
        author: {
          id: response.author.id,
          userName: response.author.userName, 
          imageUrl: response.author.imageUrl, 
          rating: response.author.rating, 
          registeredAt: response.author.registeredAt,
          postsAndRepliesCount: response.author.postsAndRepliesCount
        }
      }

      this.post.replies.push(reply);
    });
  }

}
