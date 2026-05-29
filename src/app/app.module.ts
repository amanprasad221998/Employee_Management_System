import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Root component
import { AppComponent } from './app.component';

// Eager pages — load immediately on app start
import { HomeComponent } from
  './pages/home/home.component';
import { LoginComponent } from
  './pages/login/login.component';
import { DashboardComponent } from
  './pages/dashboard/dashboard.component';
import { NotFoundComponent } from
  './pages/not-found/not-found.component';

// Interceptor
import { AuthInterceptor } from
  './core/auth.interceptor';

// NOTE — Employee and Admin components are NOT here
// They belong to their own lazy loaded modules
// EmployeeModule and AdminModule

@NgModule({
  // app.module.ts declarations
declarations: [
  AppComponent,
  HomeComponent,
  LoginComponent,
  DashboardComponent,
  NotFoundComponent
  // AdminComponent → REMOVED — now in AdminModule
  // EmployeeListComponent → REMOVED — now in EmployeeModule
  // EmployeeDetailComponent → REMOVED — now in EmployeeModule
  // AddEmployeeComponent → REMOVED — now in EmployeeModule
  // SearchFilterPipe → REMOVED — now in EmployeeModule
],

  imports: [
    BrowserModule,
    // Always needed — provides ngIf, ngFor etc

    AppRoutingModule,
    // Our routing configuration

    FormsModule,
    // Needed for [(ngModel)] — template forms

    ReactiveFormsModule,
    // Needed for FormGroup, FormControl

    HttpClientModule,
    // Needed for HttpClient in services
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      // This token tells Angular —
      // "this is an HTTP interceptor"

      useClass: AuthInterceptor,
      // Use our AuthInterceptor class

      multi: true
      // multi:true means multiple interceptors
      // can exist at same time
      // Without this — new interceptor
      // replaces old one
    }
  ],

  bootstrap: [AppComponent]
  // AppComponent is the root
  // Angular starts here
})
export class AppModule {}