import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-overview',
  templateUrl: './post-overview.component.html',
  styleUrls: ['./post-overview.component.css']
})
export class PostOverviewComponent implements OnInit {
  @Input() post: Post = new Post();
  @Input() limit: number = null; 

  constructor() { }

  ngOnInit() {
  }

}
