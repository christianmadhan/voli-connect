import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from 'src/app/components/login-dialog/login-dialog.component';
import { SignupDialogComponent } from 'src/app/components/signup-dialog/signup-dialog.component';
import { AuthService } from 'src/app/service/auth.service';
import { ElementRef } from '@angular/core'; // at the top of component.ts

@Component({
  selector: 'home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent implements OnInit {
  @ViewChild('about') elm:ElementRef | undefined;


  constructor(public dialog: MatDialog,private myElement: ElementRef) { }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  scroll(target: any) {
    let el = document.getElementById(`${target}`) as HTMLElement;
    el.scrollIntoView({behavior: 'smooth'});
}

  openSignUpDialog() {
    const dialogRef = this.dialog.open(SignupDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {
  }

  

}
