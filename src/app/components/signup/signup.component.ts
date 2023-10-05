import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.maxLength(100), Validators.required]],
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get emailControls() {
    return this.signupForm.get('email');
  }

  get passwordControls() {
    return this.signupForm.get('password');
  }

  get firstNameControls() {
    return this.signupForm.get('firstName');
  }

  get lastNameControls() {
    return this.signupForm.get('lastName');
  }

  signup(): void {
    let email: string = this.signupForm.get('email')?.value;
    let password: string = this.signupForm.get('password')?.value;
    let firstName: string = this.signupForm.get('firstName')?.value;
    let lastName: string = this.signupForm.get('lastName')?.value;

    this.auth.signup(email, password, firstName, lastName).subscribe((result) => {
      this.router.navigate(['login']);
      alert('You have successfully signed up! Login to access your new account.');
    });
  }

}
