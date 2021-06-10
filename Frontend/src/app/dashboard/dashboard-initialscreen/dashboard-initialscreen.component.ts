import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-initialscreen',
  templateUrl: './dashboard-initialscreen.component.html',
  styleUrls: ['./dashboard-initialscreen.component.css']
})
export class DashboardInitialscreenComponent implements OnInit {
  data: any;
  basicData: any;
  basicOptions: any;
  constructor() {
      this.data = {
          labels: ['Success','Errors'],
          datasets: [
              {
                  data: [300, 50],
                  backgroundColor: [
                      "#76d275",
                      "#f4511e",
                  ],
                  hoverBackgroundColor: [
                    "#76d275",
                      "#f4511e",
                  ]
              }]    
          };
  }
  ngOnInit(): void {
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Acubiz',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: '#42A5F5'
          },
          {
              label: 'Teams',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: '#FFA726'
          }
      ]
  }
  }

}
