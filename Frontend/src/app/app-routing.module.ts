import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DashboardComponentsComponent } from './dashboard/dashboard-components/dashboard-components.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { DashboardInitialscreenComponent } from './dashboard/dashboard-initialscreen/dashboard-initialscreen.component';
import { DashboardProfileComponent } from './dashboard/dashboard-profile/dashboard-profile.component';
import { HomePageComponent } from './home/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { 
    path: 'dashboard', component: DashboardHomeComponent,
    children: [
      {
        path: 'profile', // child route path
        component: DashboardProfileComponent, 
      },
      {
        path: 'components',
        component: DashboardComponentsComponent, 
      },
      {
        path: 'home',
        component: DashboardInitialscreenComponent, 
      },
    ]
},
{ path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
