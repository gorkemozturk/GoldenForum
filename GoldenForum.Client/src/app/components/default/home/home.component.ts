import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Forum } from 'src/app/models/forum';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  forums: Forum[] = [];
  latestPosts: Post[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getResources();
  }

  getResources(): void {
    this.homeService.getResources().subscribe(response => {
      this.forums = response.forums;
      this.latestPosts = response.latestPosts;
    });
  }

}
