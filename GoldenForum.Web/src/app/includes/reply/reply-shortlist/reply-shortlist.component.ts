import { Component, OnInit, Input } from '@angular/core';
import { Reply } from 'src/app/models/reply';

@Component({
  selector: 'app-reply-shortlist',
  templateUrl: './reply-shortlist.component.html',
  styleUrls: ['./reply-shortlist.component.css']
})
export class ReplyShortlistComponent implements OnInit {
  @Input() replies: Reply[] = [];
  @Input() limit?: number = null;

  constructor() { }

  ngOnInit() {
  }

}
