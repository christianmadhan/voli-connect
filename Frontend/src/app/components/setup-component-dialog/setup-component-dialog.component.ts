import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DashboardComponentsComponent } from 'src/app/dashboard/dashboard-components/dashboard-components.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setup-component-dialog',
  templateUrl: './setup-component-dialog.component.html',
  styleUrls: ['./setup-component-dialog.component.css']
})
export class SetupComponentDialogComponent implements OnInit, AfterViewInit {

  componentId: string = "";
  firstFormGroup: any;
  secondFormGroup: any;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,private _formBuilder: FormBuilder) { }
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
  }
}
