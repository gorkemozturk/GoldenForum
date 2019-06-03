import { Component, OnInit, Input } from '@angular/core';
import { Forum } from 'src/app/models/forum';

@Component({
  selector: 'app-forum-overview',
  templateUrl: './forum-overview.component.html',
  styleUrls: ['./forum-overview.component.css']
})
export class ForumOverviewComponent implements OnInit {
  @Input() forum: Forum = new Forum();
  
  constructor() { }

  ngOnInit() {
  }

}
