import { Component, OnInit, Input } from '@angular/core';
import { Reply } from 'src/app/models/reply';
import { ReplyService } from 'src/app/services/reply.service';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { Acclaim } from 'src/app/models/acclaim';
import { AcclaimService } from 'src/app/services/acclaim.service';
import { PostReportFormComponent } from 'src/app/components/default/post/post-report-form/post-report-form.component';
import { MatDialog } from '@angular/material/dialog';
import { PostEntryReportFormComponent } from 'src/app/components/default/global/post-entry-report-form/post-entry-report-form.component';

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
  liked: boolean = false;
  selectedEntry: any = new Object();

  constructor(
    private replyService: ReplyService, 
    private postService: PostService, 
    private route: ActivatedRoute, 
    private authService: AuthService, 
    private acclaimService: AcclaimService,
    private dialog: MatDialog) { }

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
    this.postService.putPostVariety(entry).subscribe(response => console.log('Konu tipi başarılı bir şekilde değiştirildi.'));
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

  acclaim(): void {
    const acclaim: Acclaim = {
      userId: this.authService.currentUser.sub,
      postId: this.route.snapshot.paramMap.get('id'),
      authorId: this.entry.author.id
    }

    this.acclaimService.postResource(acclaim).subscribe(response => {
      const user = { userName: this.authService.currentUser.userName }

      this.entry.acclaims.push(user);
      this.liked = true;
      this.entry.author.rating += 1;
    });
  }

  get isInAcclaims(): boolean {
    const acclaims = [];
    for (var item in this.entry.acclaims) {
      acclaims.push(this.entry.acclaims[item].userName);
    }

    return acclaims.find(a => a === this.authService.currentUser.unique_name) ? true : false;
  }

  openReportForm(entry: any): void {
    const dialogRef = this.dialog.open(PostEntryReportFormComponent, {
      panelClass: 'customized-dialog',
      disableClose: false,
      autoFocus: false,
      data: { entry }
    });
  }
}
