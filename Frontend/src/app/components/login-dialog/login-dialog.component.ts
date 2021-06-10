import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})

  
export class LoginDialogComponent implements OnInit {
  usernameData: string = "";
  passwordData: string = "";
  tryingtologin: boolean = false;
  loginButtonDisabled: boolean = false;
  authFailed: boolean = false;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(this.usernameData, [
      Validators.required,
    ]),
    password: new FormControl(this.passwordData, [
      Validators.required,
    ]),
  })
  
  constructor(private auth: AuthService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  get username() { return this.loginForm.get('username'); }

  get password() { return this.loginForm.get('password'); }

  async trylogin(): Promise<any> {
    console.log(this.loginForm.valid);
    if(this.loginForm.valid){
          this.tryingtologin = true;
    this.loginButtonDisabled = true;
   let response$ = await this.auth.login(this.usernameData, this.passwordData);
   response$.toPromise().then((response) => {
    this.authFailed = false;
    this.tryingtologin = false;
    this.loginButtonDisabled = false;
    localStorage.clear();
    localStorage.setItem('token', response.token);
    this.dialog.closeAll();
    this.router.navigate(['dashboard/home']);
   }).catch((error) => {
    this.tryingtologin = false;
    this.loginButtonDisabled = false;
    this.authFailed = true;
   });
  }
    }
}
