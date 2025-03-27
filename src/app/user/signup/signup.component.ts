import { Component ,OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {SignupService} from '../../userservices/signup.service'
@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  isSubmitting = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private signupService: SignupService) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z ]*$')
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]],
      address: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$')
      ]]
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    if (this.signupForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.signupService.createUser(this.signupForm.value)
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.successMessage = 'Signup successful!';
          this.signupForm.reset();
        },
        error: (error) => {
          this.isSubmitting = false;
          this.errorMessage = error.message || 'Signup failed. Please try again.';
        }
      });
  }
 }



 