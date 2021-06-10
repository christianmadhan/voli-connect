import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { CustomerMaconomy } from 'src/app/model/customer-maconomy';

@Component({
  selector: 'app-add-maconomy-dialog',
  templateUrl: './add-maconomy-dialog.component.html',
  styleUrls: ['./add-maconomy-dialog.component.css']
})
export class AddMaconomyDialogComponent implements OnInit {

  firstFormGroup: any;
  secondFormGroup: any;

  validated: boolean = false;
  maconomySuccess: boolean = false;
  maconomyError: boolean = false;

  uploadingMaconomyInfo: boolean = false;
  uploadingSuccess: boolean = false;
  uploadingError: boolean = false;

  newMaconomyInfo: CustomerMaconomy | undefined;
  @ViewChild('stepper') stepper: any;

  /**
   * Changes the step to the index specified
   * @param {number} index The index of the step
   */
  changeStep(stepper: MatStepper) {
    console.log(stepper.selectedIndex + ' : .');
    console.log(stepper + ' ___');
    if(stepper.selectedIndex === 1){
      this.validateMaconomy();
    }
  }

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
       rooturl: ['', Validators.required ],
      username: ['',Validators.required ],
      password: ['',Validators.required ],
      name: ['', Validators.required ],
      description: [''],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['',  Validators.required ]
    });
  }

  validateMaconomy(): void {
    this.secondFormGroup.reset();
    this.validated = false;
    this.maconomySuccess = false;
    this.maconomyError = false;

    let customerMaconomy: CustomerMaconomy = {
      name: this.firstFormGroup.get('name').value,
      rooturl: this.firstFormGroup.get('rooturl').value,
      username: this.firstFormGroup.get('username').value,
      password: this.firstFormGroup.get('password').value,
      description: this.firstFormGroup.get('description').value || ''
    }
    const jwt = localStorage.getItem('token');
    this.http.post('http://localhost:3000/validate/customer-maconomy', {token: jwt,  RootUrl: customerMaconomy.rooturl, Username: customerMaconomy.username, Password: customerMaconomy.password  }).toPromise()
    .then(() => {
      this.newMaconomyInfo = customerMaconomy;
      this.secondFormGroup.controls.secondCtrl.setValue('v');
      this.validated = true;
      this.maconomySuccess = true;
    }).catch((error) => {
      this.secondFormGroup.controls.secondCtrl.setValue('v');
      this.validated = true;
      if(error.status === 403){
        this.newMaconomyInfo = customerMaconomy;
        this.maconomyError = true;
      } else if(error.status === 401){
        console.log('jwt expired');
      }
      console.log(error.status + ' }} errorcode.');
    });

    console.log(customerMaconomy);
  }

  uploadCustomerMaconomyInfo(): void {
    const jwt = localStorage.getItem('token');
    this.http.post('http://localhost:3000/register/customer-maconomy', {token: jwt,  RootUrl: this.newMaconomyInfo?.rooturl, Username: this.newMaconomyInfo?.username, Password: this.newMaconomyInfo?.password, Name: this.newMaconomyInfo?.name, Description: this.newMaconomyInfo?.description || ''}).toPromise()
    .then(() => {
      this.uploadingMaconomyInfo = true;
      this.uploadingSuccess = true;
      setTimeout(() => {
        this.dialog.closeAll();
      }, 1500);
    }).catch((error) => {
      this.uploadingMaconomyInfo = true;
      if(error.status === 403){
        this.uploadingError = true;
      } else if(error.status === 401){
        console.log('jwt expired');
      }
      console.log(error.status + ' }} errorcode.');
    });
  }

  goForward(stepper: MatStepper){
    stepper.next();
    if(stepper.selectedIndex === 1){
      this.validateMaconomy();
    }
    if(stepper.selectedIndex === 2){
      this.uploadCustomerMaconomyInfo();
    }
}

}
