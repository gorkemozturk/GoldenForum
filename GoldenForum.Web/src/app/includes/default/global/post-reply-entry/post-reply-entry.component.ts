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

  onToggle(entry?: any) {
    this.collapsed = !this.collapsed;
    if (entry) { this.selectedEntry = entry; }
  }

  onUpdate() {
    if (this.type === 'reply') {
      const reply = { 
        id: this.selectedEntry.id, 
        userId: this.selectedEntry.author.id, 
        postId: this.route.snapshot.paramMap.get('id'),
        body: this.selectedEntry.body, 
        repliedAt: this.selectedEntry.repliedAt
      }
      
      this.replyService.putResource(this.selectedEntry.id, reply).subscribe(response => {
        this.collapsed = !this.collapsed;
        this.selectedEntry.modifiedAt = new Date()
      });
    }
    else if (this.type === 'post') {
      const post = { 
        id: this.selectedEntry.id, 
        userId: this.selectedEntry.author.id, 
        forumId: this.selectedEntry.forumId,
        title: this.selectedEntry.title,
        slug: this.selectedEntry.slug,
        body: this.selectedEntry.body,
        postedAt: this.selectedEntry.postedAt,
        variety: this.selectedEntry.variety
      }

      this.postService.putResource(this.selectedEntry.id, post).subscribe(response => {
        this.collapsed = !this.collapsed;
        this.selectedEntry.modifiedAt = new Date()
      });
    }
  }

  onDelete(entry: any) {
    if (this.type === 'reply') {
      this.replyService.deleteResource(entry.id).subscribe(response => entry.isDeleted = !entry.isDeleted);
    }
    else if (this.type === 'post') {
      this.postService.deleteResource(entry.id).subscribe(response => entry.isDeleted = !entry.isDeleted);
    }
  }

  onChange(entry: any, type: number) {
    entry.variety = type;
    this.postService.putPostVariety(entry).subscribe(response => console.log('Konu tipi başarılı bir şekilde değiştirildi.'));
  }

}
