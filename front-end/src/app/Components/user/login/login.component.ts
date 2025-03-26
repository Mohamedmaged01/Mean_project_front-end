import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService, LoginData } from '../../../userservices/login.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  showPassword = false; 

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        this.emailValidator()
        
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  get f() {
    return this.loginForm.controls as {
      [key: string]: any;
      email: any;
      password: any;
    };
  }
  emailValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim();
      if (!value) return null; 
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isEmailValid = emailRegex.test(value);

      console.log(`Validating email: ${value}, Result: ${isEmailValid}`);

      return isEmailValid ? null : { email: true };
    };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    const loginData: LoginData = this.loginForm.value;

    this.loginService.login(loginData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = 'Login successful!';

      
        if (response.token) {
          localStorage.setItem('token', response.token);
        }

     
        setTimeout(() => {
          this.router.navigate(['/cart']);
        }, 2000);

        this.loginForm.reset();
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.message || 'Login failed. Please try again.';
      }
    });
  }
}