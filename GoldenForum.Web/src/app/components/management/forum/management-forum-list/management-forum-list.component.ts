import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { ManagementForumFormComponent } from '../management-forum-form/management-forum-form.component';
import { Forum } from 'src/app/models/forum';
import { ManagementCategoryFormComponent } from '../../category/management-category-form/management-category-form.component';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-management-forum-list',
  templateUrl: './management-forum-list.component.html',
  styleUrls: ['./management-forum-list.component.css']
})
export class ManagementForumListComponent implements OnInit {
  title: string = 'Forumlar';
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private forumService: ForumService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getCategoriesWithForums();
  }

  getCategoriesWithForums(): void {
    this.categoryService.getResources().subscribe(response => this.categories = response.sort((a,b) => a.priority - b.priority));
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
      data: { priority: this.categories.length + 1, category }
    });

    dialogRef.afterClosed().subscribe(result => this.getCategoriesWithForums());
  }

  onDelete(entry: any, type: string) {
    if (type === 'category') {
      if (entry.forums.length) {
        alert(entry.categoryName + ' adlı kategoriye forum veya forumlara sahip olduğundan dolayı silemezsiniz.');
        return;
      }

      this.categoryService.deleteResource(entry.id).subscribe(result => {
        const index = this.categories.indexOf(entry);
        this.categories.splice(index, 1);
      });
    }
    else if (type === 'forum') {
      if (entry.latestPost) {
        alert(entry.title + ' adlı forum gönderi veya gönderilere sahip olduğundan dolayı silemezsiniz.');
        return;
      }

      this.forumService.deleteResource(entry.id).subscribe(result => console.log(entry.title + ' adlı forum başarılı bir şekilde silindi.'));
    }
  }

  down(category: Category) {
    const c: Category = this.categories.find(c => c.priority === category.priority + 1);

    category.priority += 1;
    c.priority -= 1;

    this.categories.sort((a,b) => a.priority - b.priority);

    this.categoryService.putResource(category.id, category).subscribe(response => {
      console.log(category.categoryName + ' kategorisine ait sıralama değiştirildi: ' + category.priority)
    });

    this.categoryService.putResource(c.id, c).subscribe(response => {
      console.log(c.categoryName + ' kategorisine ait sıralama değiştirildi: ' + category.priority)
    });
  }

  up(category: Category) {
    const c: Category = this.categories.find(c => c.priority === category.priority - 1);

    category.priority -= 1;
    c.priority += 1;

    this.categories.sort((a,b) => a.priority - b.priority);

    this.categoryService.putResource(category.id, category).subscribe(response => {
      console.log(category.categoryName + ' kategorisine ait sıralama değiştirildi: ' + category.priority)
    });

    this.categoryService.putResource(c.id, c).subscribe(response => {
      console.log(c.categoryName + ' kategorisine ait sıralama değiştirildi: ' + category.priority)
    });
  }

}
