import { Component } from '@angular/core';
import { FormGroup, FormControl,
         Validators, AbstractControl,
         ValidationErrors }
  from '@angular/forms';
import { Router } from '@angular/router';

// Custom validator — no numbers in name
function noNumbersValidator(
  control: AbstractControl
): ValidationErrors | null {
  // test() checks if pattern exists in string
  // /[0-9]/ means any digit 0-9
  if (/[0-9]/.test(control.value)) {
    return { noNumbers: true }; // invalid
  }
  return null; // valid
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  // Show success message after submit
  successMessage: string = '';

  // Reactive form
  employeeForm = new FormGroup({

    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      noNumbersValidator
      // custom validator — name cannot have numbers
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    department: new FormControl('', [
      Validators.required
    ]),

    city: new FormControl('', [
      Validators.required
    ]),

    phone: new FormControl('')
    // phone is optional — no validators
  });

  // Shortcut to access controls
  get f() {
    return this.employeeForm.controls;
  }

  constructor(private router: Router) {}

  onSubmit() {

    // Check all fields valid
    if (this.employeeForm.invalid) {
      // Mark all fields as touched
      // so errors show immediately
      this.employeeForm.markAllAsTouched();
      return;
    }

    // In real app — call service to save
    // For now — just show success
    console.log('New employee:',
      this.employeeForm.value);

    // Show success message
    this.successMessage =
      `Employee ${this.f['name'].value}
       added successfully!`;

    // Reset form
    this.employeeForm.reset();

    // Navigate back to list after 2 seconds
    setTimeout(() => {
      this.router.navigate(['/employees']);
    }, 2000);
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}