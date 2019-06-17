import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title: string = 'Kullanıcı Girişi';
  form: FormGroup;
  submitted: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm();
  }

  loginForm(): void {
    this.form = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (this.form.invalid) { return; }

    this.authService.login(form.value).subscribe(response => {
      localStorage.setItem('token', response);
      this.router.navigateByUrl('/');
    });
  }

}