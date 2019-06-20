import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { ManagementForumFormComponent } from '../management-forum-form/management-forum-form.component';
import { Forum } from 'src/app/models/forum';
import { ManagementCategoryFormComponent } from '../../category/management-category-form/management-category-form.component';

@Component({
  selector: 'app-management-forum-list',
  templateUrl: './management-forum-list.component.html',
  styleUrls: ['./management-forum-list.component.css']
})
export class ManagementForumListComponent implements OnInit {
  title: string = 'Forumlar';
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getCategoriesWithForums();
  }

  getCategoriesWithForums(): void {
    this.categoryService.getResources().subscribe(response => this.categories = response);
  }

  openForumForm(categoryId: number, forum?: Forum): void {
    const dialogRef = this.dialog.open(ManagementForumFormComponent, {
      panelClass: 'customized-dialog',
      disableClose: false,
      autoFocus: false,
      data: { categoryId, forum }
    });

    dialogRef.afterClosed().subscribe(result => this.getCategoriesWithForums());
  }

  openCategoryForm(category?: Category): void {
    const dialogRef = this.dialog.open(ManagementCategoryFormComponent, {
      panelClass: 'customized-dialog',
      disableClose: false,
      autoFocus: false,
      data: { category }
    });

    dialogRef.afterClosed().subscribe(result => this.getCategoriesWithForums());
  }

}
