import { AfterViewInit, Component, inject, OnInit, ViewChild, DestroyRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, ReactiveFormsModule],
})
// export class LoginComponent implements AfterViewInit {
//   @ViewChild('form') form!: NgForm;

//   ngAfterViewInit() {
//     this.form.valueChanges?.pipe(debounceTime(500)).subscribe((value: { email: any; }) => {
//       window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email }));
//     });
//   }

//   onSubmit(formData:NgForm) {
//     if (formData.invalid) {
//       return;
//     }

//     const enteredEmail = formData.value.email;
//     const enteredPassword = formData.value.password;
//     console.log(enteredEmail, enteredPassword);
//     formData.reset();
//   }
// }

//using reactive forms
export class LoginComponent  implements OnInit{
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });
  get emailIsValid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.invalid &&
      this.form.controls.email.dirty
    );
  }
  get passwordIsValid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.invalid &&
      this.form.controls.password.dirty
    );
  }
  ngOnInit() {
    const savedForm = window.localStorage.getItem('saved-login-form');
    if (savedForm) {
      const parsedForm = JSON.parse(savedForm);
      this.form.patchValue({
        email: parsedForm.email,
      })};

    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        window.localStorage.setItem(
          'saved-login-form',
          JSON.stringify({ email: value.email })
        );
      });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      }
    );  
  }
  onSubmit() {
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }
}
