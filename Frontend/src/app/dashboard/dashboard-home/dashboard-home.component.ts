import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  routeName: string = '';
  display: boolean = true;
  constructor(private router: Router, private auth: AuthService) {
    this.router.events.subscribe((event: Event) => {
    if(event instanceof NavigationEnd) {
     let name = event.url.split('/');
     this.print(name.length);
        if(name.length > 2){
          let upperCasedName =  name[2].charAt(0).toUpperCase() + name[2].slice(1);
          this.routeName = upperCasedName;
        } else {
          this.routeName = "Dashboard";
        }
    }
    });

  }

  print(input: any) {
    console.log(input);
  }

  signout(): void {
    this.auth.logout();
  }

  ngOnInit(): void {
  }

}
