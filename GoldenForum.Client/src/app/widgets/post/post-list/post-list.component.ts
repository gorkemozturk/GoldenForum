import { Component, OnInit, Input } from '@angular/core';
import { Forum } from 'src/app/models/forum';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() forum: Forum = new Forum();

  constructor() { }

  ngOnInit() {
  }

}
