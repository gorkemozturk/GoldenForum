import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-entry',
  templateUrl: './post-entry.component.html',
  styleUrls: ['./post-entry.component.css']
})
export class PostEntryComponent implements OnInit {
  @Input() post: Post = new Post();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
