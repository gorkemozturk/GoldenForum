import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-management-forum-list',
  templateUrl: './management-forum-list.component.html',
  styleUrls: ['./management-forum-list.component.css']
})
export class ManagementForumListComponent implements OnInit {
  title: string = 'Forumlar';
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategoriesWithForums();
  }

  getCategoriesWithForums(): void {
    this.categoryService.getResources().subscribe(response => this.categories = response);
  }

}
