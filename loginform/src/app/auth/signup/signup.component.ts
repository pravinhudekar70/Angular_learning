import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
function equalValues(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  if (password === confirmPassword) {
    return null;
  }
  return { passwordsNotEqual: true };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [FormsModule, ReactiveFormsModule],
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    },[equalValues]),

    firstName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      number: new FormControl('', {
        validators: [Validators.required, Validators.minLength(10)],
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      city: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)],
      }),
    }),

    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', {
      validators: [Validators.required],
    }),
    source: new FormArray(
      [new FormControl(false), new FormControl(false), new FormControl(false)],
      {
        validators: [Validators.required],
      }
    ),
    agree: new FormControl(false, {
      validators: [Validators.requiredTrue],
    }),
  });

  onSubmit() {
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }
    console.log(this.form.value);
  }
  onReset() {
    this.form.reset();
  }
}
