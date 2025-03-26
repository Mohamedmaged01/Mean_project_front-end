import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SignupService } from '../../../userservices/signup.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  showPassword = false; 
  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z ]*$')
      ]],
      email: ['', [
        Validators.required,
        this.emailValidator()
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$')
      ]]
    });
  }

  get f() {
    return this.signupForm.controls as {
      [key: string]: AbstractControl;
      name: AbstractControl;
      email: AbstractControl;
      password: AbstractControl;
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

  onSubmit() {
    if (this.signupForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.signupService.createUser(this.signupForm.value).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = 'Signup successful!';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); // Redirect after 2 seconds to show success message
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error?.error?.message || 'Signup failed. Please try again.';
      }
    });
  }

  signUpWithGoogle() {
   this.signupService.googleLogin();
    console.log('Sign up with Google clicked');
   
  }
  togglePasswordVisibility() { 
    this.showPassword = !this.showPassword;
  }
}