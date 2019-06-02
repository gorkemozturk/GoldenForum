import { Component, OnInit, Input } from '@angular/core';
import { Forum } from 'src/app/models/forum';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {
  @Input() forums: Forum[] = [];
  
  constructor() { }

  ngOnInit() {
  }

}
