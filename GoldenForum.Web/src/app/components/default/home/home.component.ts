import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { Reply } from 'src/app/models/reply';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  latestPosts: Post[] = [];
  latestReplies: Reply[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getCategoriesWithForums();
  }

  getCategoriesWithForums(): void {
    this.homeService.getResources().subscribe(response => {
      this.categories = response.categories;
      this.latestPosts = response.latestPosts;
      this.latestReplies = response.latestReplies;
    });
  }

}
