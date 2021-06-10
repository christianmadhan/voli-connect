import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { AddMaconomyDialogComponent } from 'src/app/components/add-maconomy-dialog/add-maconomy-dialog.component';
import { CrucialErrorDialogComponent } from 'src/app/components/crucial-error-dialog/crucial-error-dialog.component';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.css']
})
export class DashboardProfileComponent implements OnInit {
data: any;
maconomysystems: any = [];

  constructor(private customerService: CustomerService, public dialog: MatDialog, private router: Router,) {}
  ngOnInit(): void {
     let response$ = this.customerService.getCustomerInfo();
     response$.pipe(
        catchError(err => {
            console.log('Handling error locally and rethrowing it...', err);
            this.dialog.open(CrucialErrorDialogComponent, {disableClose: true});
            setTimeout(() => {
                this.dialog.closeAll();
                this.router.navigate(['/']);
            }, 2000);
            return throwError(err);
        })
    )
    .toPromise().then(res => {
        console.log(res);
        this.data = res.data;
    });
    let maconomySys$ = this.customerService.getMyMaconomySystems();
    maconomySys$.pipe(
       catchError(err => {
           console.log('failure || token exp.', err);
           this.dialog.open(CrucialErrorDialogComponent, {disableClose: true});
           setTimeout(() => {
               this.dialog.closeAll();
               this.router.navigate(['/']);
           }, 2000);
           return throwError(err);
       })
   )
   .toPromise().then(res => {
       this.maconomysystems = res.data;
       console.log(this.maconomysystems);
   });
    }

    openAddMaconomyDialog(): void {
       let addDialogClosed$ = this.dialog.open(AddMaconomyDialogComponent).afterClosed();
       addDialogClosed$.toPromise().then(() => {
           console.log('dialog is closed');
           this.ngOnInit();
       });
    }
}
