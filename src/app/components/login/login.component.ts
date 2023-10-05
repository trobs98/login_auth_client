import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiErrorResponse } from 'src/app/classes/api-error-response';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

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

  displayError: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('user: ', this.auth.user);
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

    this.auth.login(email, password).pipe(catchError(this.catchLoginError.bind(this))).subscribe((response) => {
      this.router.navigate(['home']);
    });
  }
  
  private catchLoginError (error: HttpErrorResponse) {
    let apiError = new ApiErrorResponse(error.error?.status, error.error?.data?.message, error.error?.data?.code, error.error?.data?.name, error.headers, error.url);
    this.displayError = apiError.statusMessage;
    
    return throwError(() => apiError);
  }
}
