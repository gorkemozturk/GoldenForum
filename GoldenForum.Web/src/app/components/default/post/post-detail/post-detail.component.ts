import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post = new Post();

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPostWithReplies();
  }

  getPostWithReplies() {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.getResource(id).subscribe(response => this.post = response);
  }

}
