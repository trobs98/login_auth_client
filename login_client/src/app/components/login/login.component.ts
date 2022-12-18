import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.maxLength(100), Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
  }

  get emailControls() {
    return this.loginForm.get('email');
  }

  get passwordControls() {
    return this.loginForm.get('password');
  }

  login() {
    let email: string = this.loginForm.get('email')?.value; 
    let password: string = this.loginForm.get('password')?.value;

    this.auth.login(email, password).subscribe((value) => {
      console.log('value: ', value);
    });
  }
}
