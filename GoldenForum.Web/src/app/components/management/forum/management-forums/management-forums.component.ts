import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-management-forums',
  templateUrl: './management-forums.component.html',
  styleUrls: ['./management-forums.component.css']
})
export class ManagementForumsComponent implements OnInit {
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
