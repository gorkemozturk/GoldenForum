import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from 'src/app/helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title: string = 'Kullanıcı Kaydı';
  form: FormGroup;
  submitted: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.registrationForm();
  }

  registrationForm(): void {
    this.form = this.formBuilder.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (this.form.invalid) { return; }

    this.authService.register(form.value).subscribe(response => this.router.navigateByUrl('/login'));
  }

}