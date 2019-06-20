import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-post-owner',
  templateUrl: './post-owner.component.html',
  styleUrls: ['./post-owner.component.css']
})
export class PostOwnerComponent implements OnInit {
  @Input() author: User = new User();

  constructor() { }

  ngOnInit() {
  }

}
