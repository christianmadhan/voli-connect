import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeNavbarComponent } from './home/home-navbar/home-navbar.component';
import { HomeFooterComponent } from './home/home-footer/home-footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home/home-page/home-page.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { SignupDialogComponent } from './components/signup-dialog/signup-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';

import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponentsComponent } from './dashboard/dashboard-components/dashboard-components.component';
import { DashboardProfileComponent } from './dashboard/dashboard-profile/dashboard-profile.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DashboardInitialscreenComponent } from './dashboard/dashboard-initialscreen/dashboard-initialscreen.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';


// Prime Ng modules
import {ButtonModule} from 'primeng/button';
import {ChartModule} from 'primeng/chart';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {SidebarModule} from 'primeng/sidebar';
import { CrucialErrorDialogComponent } from './components/crucial-error-dialog/crucial-error-dialog.component';
import {SkeletonModule} from 'primeng/skeleton';
import { AddMaconomyDialogComponent } from './components/add-maconomy-dialog/add-maconomy-dialog.component';
import { SetupComponentDialogComponent } from './components/setup-component-dialog/setup-component-dialog.component';
import { SqlDialogComponent } from './components/setup-components/sql-dialog/sql-dialog.component';
import {DropdownModule} from 'primeng/dropdown';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeNavbarComponent,
    HomeFooterComponent,
    HomePageComponent,
    LoginDialogComponent,
    SignupDialogComponent,
    DashboardHomeComponent,
    DashboardComponentsComponent,
    DashboardProfileComponent,
    NotfoundComponent,
    DashboardInitialscreenComponent,
    CrucialErrorDialogComponent,
    AddMaconomyDialogComponent,
    SetupComponentDialogComponent,
    SqlDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatDatepickerModule,
    ButtonModule,
    ChartModule,
    ProgressBarModule,
    MatDividerModule,
    InputTextModule,
    CardModule,
    MatExpansionModule,
    DataViewModule,
    DialogModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MessagesModule,
    MessageModule,
    SidebarModule,
    SkeletonModule,
    DropdownModule,
    MatStepperModule,
    MatSelectModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
