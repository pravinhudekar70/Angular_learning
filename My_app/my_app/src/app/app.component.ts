import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from "./header/header.component";
import { UserComponent } from "./user/user.component";

@Component({
  selector: 'app-root',
  imports: [LoginComponent, SignupComponent, HeaderComponent, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my_app';

  handleOnClick(){
    alert("button clicked");
    this.fub2();
  }
  fub2(){
    console.log("hihi");
  }
}
