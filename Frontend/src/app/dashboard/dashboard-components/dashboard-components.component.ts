import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SetupComponentDialogComponent } from 'src/app/components/setup-component-dialog/setup-component-dialog.component';
import { SqlDialogComponent } from 'src/app/components/setup-components/sql-dialog/sql-dialog.component';
import { VoliComponent } from 'src/app/model/voli-component';
import { ComponentService } from 'src/app/service/component.service';

@Component({
  selector: 'app-dashboard-components',
  templateUrl: './dashboard-components.component.html',
  styleUrls: ['./dashboard-components.component.css']
})
export class DashboardComponentsComponent implements OnInit {
  components: VoliComponent[] = [];
  myComponents: VoliComponent[] = [];
  displayMaximizable: boolean = false;

  constructor(private componentService: ComponentService, private dialog: MatDialog) { }
  showMaximizableDialog() {
    this.displayMaximizable = true;
}

ngOnInit() {
  this.componentService.getComponents().subscribe(response => this.components = response.data);
}

  openSetupComponent(Name:string): void {
    switch (Name) {
      case 'SQL':
        this.dialog.open(SqlDialogComponent, {data: Name});
        break;
    
      default:
        this.dialog.open(SetupComponentDialogComponent, {data: Name});
        break;
    }
  }
}
