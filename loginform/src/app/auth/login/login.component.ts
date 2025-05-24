import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule]
 
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('form') form!: NgForm;

  ngAfterViewInit() {
    this.form.valueChanges?.pipe(debounceTime(500)).subscribe((value: { email: any; }) => {
      window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email }));
    });
  }

  onSubmit(formData:NgForm) {
    if (formData.invalid) {
      return;
    }
    
    const enteredEmail = formData.value.email;
    const enteredPassword = formData.value.password;
    console.log(enteredEmail, enteredPassword);
    formData.reset();
  }
}
