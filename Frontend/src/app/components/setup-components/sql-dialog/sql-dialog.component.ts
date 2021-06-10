import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomerService } from 'src/app/service/customer.service';
import { CrucialErrorDialogComponent } from '../../crucial-error-dialog/crucial-error-dialog.component';

interface Period {
  value: string;
  viewValue: string;
}

interface RunEvery {
  interval: string;
}

@Component({
  selector: 'app-sql-dialog',
  templateUrl: './sql-dialog.component.html',
  styleUrls: ['./sql-dialog.component.css']
})


export class SqlDialogComponent implements OnInit, AfterViewInit {

  componentId: string = "";
  firstFormGroup: any;
  secondFormGroup: any;
  maconomyName: string = "";

  loading: boolean = true;
  checkMacSystems: boolean = true;

  noMaconomy = false;

  periods: Period[] = [
    {value: '0', viewValue: 'Monthly'},
    {value: '1', viewValue: 'Yearly'},
  ];

  runEvery: RunEvery[] = [
    {interval: 'Hour'},
    {interval: '2nd Hour'},
    {interval: 'Day'},
    {interval: 'Week'},
    {interval: 'Month'}
  ];

  customerMaconomy: any[] = [];

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,private _formBuilder: FormBuilder, private customerService: CustomerService, private dialog: MatDialog, private router: Router) {
   }
  ngAfterViewInit(): void {
    //this.componentId = this.dashboardcomponent.selectedComponentId;
    this.componentId = this.data;
    console.log(this.componentId);
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
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
       this.customerMaconomy = res.data;
       if(this.customerMaconomy.length == 0){
        this.loading = false;
        this.noMaconomy = true;
       } else {
        this.loading = false;
         this.checkMacSystems = false;
       }
       console.log(this.customerMaconomy);
   });
  }

  setupSQL(){
    this.dialog.closeAll();
  }

  goToProfile() {
    this.dialog.closeAll();
    this.router.navigate(['/dashboard/profile']);
  }

}
