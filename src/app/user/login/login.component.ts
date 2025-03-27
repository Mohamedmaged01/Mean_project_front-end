import { Component ,OnInit} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from '../../userservices/login.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    const loginData = this.loginForm.value;

    this.loginService.login(loginData)
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.successMessage = 'Login successful!';
          this.loginForm.reset();
          if (loginData.email === 'mostafamokna78@gmail.com') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
          console.log('Login response:', response);
        
        },
        error: (error) => {
          this.isSubmitting = false;
          this.errorMessage = error.message || 'Login failed. Please try again.';
          console.error('Login error:', error);
        }
      });

}
onGoogleLogin() {
  this.loginService.googleLogin(); 
}
}