import { Component, OnInit, Input } from '@angular/core';
import { Reply } from 'src/app/models/reply';
import { ReplyService } from 'src/app/services/reply.service';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-reply-entry',
  templateUrl: './post-reply-entry.component.html',
  styleUrls: ['./post-reply-entry.component.css']
})
export class PostReplyEntryComponent implements OnInit {
  @Input() entry: any = new Object();
  @Input() index?: number = null;
  @Input() type: string = null;

  collapsed: boolean = false;
  selectedEntry: any = new Object();

  constructor(private replyService: ReplyService, private postService: PostService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
  }

  onToggle(entry?: any): void {
    this.collapsed = !this.collapsed;
    if (entry) { this.selectedEntry = entry; }
  }

  onUpdate(): void {
    if (this.type === 'reply') {
      const reply = this.selectedEntry;
      reply.postId = this.route.snapshot.paramMap.get('id');
      reply.userId = this.selectedEntry.author.id;
      
      this.putReply(reply);
    }
    else if (this.type === 'post') {
      const post = this.selectedEntry;
      post.userId = this.selectedEntry.author.id;

      this.putPost(post);
    }
  }

  onDelete(entry: any): void {
    if (this.type === 'reply') {
      this.replyService.deleteResource(entry.id).subscribe(response => entry.isDeleted = !entry.isDeleted);
    }
    else if (this.type === 'post') {
      this.postService.deleteResource(entry.id).subscribe(response => entry.isDeleted = !entry.isDeleted);
    }
  }

  onChange(entry: any, type: number): void {
    entry.variety = type;
    this.postService.putPostVariety(entry).subscribe(response => console.log('Konu tipini başarılı bir şekilde değiştirildi.'));
  }

  putPost(post: any): void {
    this.postService.putResource(post.id, post).subscribe(response => {
      this.collapsed = !this.collapsed;
      this.selectedEntry.modifiedAt = new Date();
    });
  }

  putReply(reply: any): void {
    this.replyService.putResource(reply.id, reply).subscribe(response => {
      this.collapsed = !this.collapsed;
      this.selectedEntry.modifiedAt = new Date();
    });
  }
}
