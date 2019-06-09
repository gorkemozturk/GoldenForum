import { Component, OnInit, Input } from '@angular/core';
import { Reply } from 'src/app/models/reply';
import { AuthService } from 'src/app/services/auth.service';
import { ReplyService } from 'src/app/services/reply.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reply-entry',
  templateUrl: './reply-entry.component.html',
  styleUrls: ['./reply-entry.component.css']
})
export class ReplyEntryComponent implements OnInit {
  @Input() reply: Reply = new Reply();
  @Input() i: number = null;

  selectedReply: Reply = new Reply();
  collapsed: boolean = false;
  
  constructor(private authService: AuthService, private replyService: ReplyService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onToggle(reply?: Reply) {
    this.collapsed = !this.collapsed;
    if (reply) {
      this.selectedReply = reply;
    }
  }

  onUpdate() {
    const newReply = {
      id: this.selectedReply.id,
      userId: this.selectedReply.authorId,
      postId: this.route.snapshot.paramMap.get('id'),
      body: this.selectedReply.body,
      repliedAt: this.selectedReply.repliedAt
    }

    this.replyService.putResource(this.selectedReply.id, newReply).subscribe(response => this.collapsed = !this.collapsed);
  }

}
