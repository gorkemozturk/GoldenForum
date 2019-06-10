import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-shortlist',
  templateUrl: './post-shortlist.component.html',
  styleUrls: ['./post-shortlist.component.css']
})
export class PostShortlistComponent implements OnInit {
  @Input() posts: Post[] = [];
  @Input() title: string = null;
  
  constructor() { }

  ngOnInit() {
  }

}
