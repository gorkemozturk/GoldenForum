import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-management-category-form',
  templateUrl: './management-category-form.component.html',
  styleUrls: ['./management-category-form.component.css']
})
export class ManagementCategoryFormComponent implements OnInit {
  title: string = null;
  form: FormGroup;
  submitted: boolean = false;
  
  constructor(@Inject(MAT_DIALOG_DATA) private data, private formBuilder: FormBuilder, private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryInsertingForm();

    if (this.data.category) {
      this.title = 'Kategori Düzenle: ' + this.data.category.categoryName;
      this.categoryUpdatingForm();
    }
    else {
      this.title = 'Yeni Kategori Oluştur';
    }
  }

  categoryInsertingForm(): void {
    this.form = this.formBuilder.group({
      categoryName: [null, Validators.required],
      priority: [this.data.priority, Validators.required]
    });
  }

  categoryUpdatingForm(): void {
    this.form.addControl('id', new FormControl(this.data.category.id));
    
    this.form.patchValue({
      categoryName: this.data.category.categoryName,
      priority: this.data.category.priority
    });
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (this.form.invalid) { return; }

    if (this.data.category) { 
      this.categoryService.putResource(this.data.category.id, form.value).subscribe(response => this.submitted = false);
    }
    else {
      this.categoryService.postResource(form.value).subscribe(response => this.submitted = false);
    }
  }

}
