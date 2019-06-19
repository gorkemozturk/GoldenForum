import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-reply-overview',
  templateUrl: './post-reply-overview.component.html',
  styleUrls: ['./post-reply-overview.component.css']
})
export class PostReplyOverviewComponent implements OnInit {
  @Input() entry: any = new Object();
  @Input() type: string = null; 
  @Input() limit?: number = null; 
  
  constructor() { }

  ngOnInit() {
  }

}
