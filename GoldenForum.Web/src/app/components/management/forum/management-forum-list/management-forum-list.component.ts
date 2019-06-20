import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { ManagementForumFormComponent } from '../management-forum-form/management-forum-form.component';

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

  openForumForm(categoryId: number, forumId?: number): void {
    const dialogRef = this.dialog.open(ManagementForumFormComponent, {
      panelClass: 'customized-dialog',
      disableClose: false,
      autoFocus: false,
      data: { categoryId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategoriesWithForums();
    });
  }

}
