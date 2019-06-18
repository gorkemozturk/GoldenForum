import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/services/forum.service';
import { Forum } from 'src/app/models/forum';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css']
})
export class ForumDetailComponent implements OnInit {
  forum: Forum = new Forum();
  attachedPosts: Post[] = [];

  constructor(private forumService: ForumService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getForumWithPosts();
  }

  getForumWithPosts(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.forumService.getResource(id).subscribe(response => {
      this.forum = response;
      this.attachedPosts = response.posts.filter(p => p.isAttached === true);
    });
  }
}
