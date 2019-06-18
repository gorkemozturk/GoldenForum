import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/services/forum.service';
import { Forum } from 'src/app/models/forum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css']
})
export class ForumDetailComponent implements OnInit {
  forum: Forum = new Forum();

  constructor(private forumService: ForumService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getForumWithPosts();
  }

  getForumWithPosts(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.forumService.getResource(id).subscribe(response => {
      this.forum.id = response.id;
      this.forum.title = response.title;
      this.forum.slug = response.slug;
      this.forum.imageUrl = response.imageUrl;
      this.forum.description = response.description;

      this.forum.posts = response.posts.filter(p => p.type === 'Opened' || p.type === 'Closed');
      this.forum.attachedPosts = response.posts.filter(p => p.type === 'Attached');
    });
  }
}
