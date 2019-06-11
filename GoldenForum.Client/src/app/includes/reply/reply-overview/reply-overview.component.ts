import { Component, OnInit, Input } from '@angular/core';
import { Reply } from 'src/app/models/reply';

@Component({
  selector: 'app-reply-overview',
  templateUrl: './reply-overview.component.html',
  styleUrls: ['./reply-overview.component.css']
})
export class ReplyOverviewComponent implements OnInit {
  @Input() reply: Reply = new Reply();
  @Input() limit?: number = null;
  
  constructor() { }

  ngOnInit() {
  }

}
