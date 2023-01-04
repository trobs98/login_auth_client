import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  passwordReset = false;
  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  get emailControls() {
    return this.forgotPasswordForm.get('email')?.value;
  }

  submitPasswordReset(): void {
    console.log('resetting password');
    this.passwordReset = true;
  }

}
