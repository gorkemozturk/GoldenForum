import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { NgForm } from '@angular/forms';
import { ReplyService } from 'src/app/services/reply.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post = new Post();

  constructor(private postService: PostService, private route: ActivatedRoute, private resplyService: ReplyService) { }

  ngOnInit() {
    this.getPost();
  }

  getPost(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.getResource(id).subscribe(response => this.post = response);
  }

  onSubmit(form: NgForm): void {
    this.resplyService.postResource(form.value).subscribe(reponse => {
      console.log(true);
    });
  }

}
