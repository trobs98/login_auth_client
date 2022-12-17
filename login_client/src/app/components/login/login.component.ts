import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onLogin() {

  }

  get emailControls() {
    return this.loginForm.get('email');
  }

  get passwordControls() {
    return this.loginForm.get('password');
  }
}
