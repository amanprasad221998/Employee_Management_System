import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators }
  from '@angular/forms';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Error message shown when login fails
  errorMessage: string = '';

  // Reactive form — login has 2 fields
  loginForm = new FormGroup({

    email: new FormControl('', [
      Validators.required,
      // cannot be empty
      Validators.email
      // must be valid email format
    ]),

    password: new FormControl('', [
      Validators.required,
      // cannot be empty
      Validators.minLength(6)
      // minimum 6 characters
    ])
  });

  // Shortcut to access form controls
  // Instead of loginForm.get('email')
  // We write f['email']
  get f() {
    return this.loginForm.controls;
  }

  constructor(private authService: AuthService) {}
  // AuthService handles actual login logic
  // Component just calls it

  onLogin() {

    // Step 1 — check if form is valid
    if (this.loginForm.invalid) {
      return;
      // stop here — don't proceed
      // form shows its own error messages
    }

    // Step 2 — get values from form
    const email = this.f['email'].value ?? '';
const password = this.f['password'].value ?? '';
// ?? means: if null or undefined — use empty string instead

    // Step 3 — call AuthService
    const success = this.authService.login(
      email,
      password
    );

    // Step 4 — react to result
    if (success) {
      // AuthService already navigated to dashboard
      // nothing to do here
      this.errorMessage = '';
    } else {
      // Wrong credentials — show error
      this.errorMessage =
        'Invalid email or password. Please try again.';
    }
  }
}