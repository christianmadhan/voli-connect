import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { passwordMatchValidator } from 'src/app/helper/passwordchecker';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent implements OnInit {
  usernameData: string = "";
  passwordData: string = "";
  repeatPasswordData: string = "";
  emailData: string = "";
  signupFailed: boolean = false;
  signinButtonDisabled: boolean = false;
  tryingtosignup: boolean = false;
  usernameAlreadyExits: boolean = false;

  signupForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private authService: AuthService, private dialog: MatDialog, private router: Router) {

   }

  
  get username() { return this.signupForm.get('username'); }

  get password() { return this.signupForm.get('password'); }
  
  get repeatpassword() { return this.signupForm.get('repeatpassword'); }

  get email() { return this.signupForm.get('email'); }

  
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: new FormControl(this.usernameData, [
        Validators.required,
        Validators.max(255)
      ]),
      password: new FormControl(this.passwordData, [
        Validators.required,

        Validators.max(255)
      ]),
      repeatpassword: new FormControl(this.repeatPasswordData, [
        Validators.required,
        Validators.max(255), 
      ]),
      email: new FormControl(this.emailData, [
        Validators.required,
        Validators.email,
        Validators.max(255)
      ]),
  
    },{ 
      validator: passwordMatchValidator
    } as AbstractControlOptions)
  }
  
  trySignup(): void {
    if(this.signupForm.valid){
      this.tryingtosignup = true;
      this.signinButtonDisabled = true;
      this.usernameAlreadyExits = false;
      let response$ = this.authService.signup(this.usernameData, this.passwordData, this.emailData);
      response$.toPromise().then((response) => {
        this.signupFailed = false;
        this.tryingtosignup = false;
        this.signinButtonDisabled = false;
        this.usernameAlreadyExits = false;
        localStorage.clear();
        localStorage.setItem('token', response.token);
        this.dialog.closeAll();
        this.router.navigate(['dashboard/home']);
       }).catch((error: any) => {
         console.log(error);
        this.tryingtosignup = false;
        this.signinButtonDisabled = false;
        this.signupFailed = true;
        if(error.status === 430){
          this.usernameAlreadyExits = true;
          this.signupForm.controls['username'].setErrors({'Username already exit': true});
        }
       });
    }
  }

}
