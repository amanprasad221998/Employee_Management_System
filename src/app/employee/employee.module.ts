import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// CommonModule gives us:
// *ngIf, *ngFor, async pipe, date pipe etc
// We use CommonModule in feature modules
// NOT BrowserModule — that's only for AppModule

import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// ReactiveFormsModule needed for add-employee form
// FormGroup, FormControl, Validators

import { FormsModule } from '@angular/forms';
// FormsModule needed for [(ngModel)] search input

// Components belonging to this module
import { EmployeeListComponent } from
  './employee-list/employee-list.component';
import { EmployeeDetailComponent } from
  './employee-detail/employee-detail.component';
import { AddEmployeeComponent } from
  '../add-employee/add-employee.component';


// Pipe belonging to this module
import { SearchFilterPipe } from
  '../shared/search.pipe';

// Guards
import { AuthGuard } from '../core/auth.guard';
import { RoleGuard } from '../core/role.guard';

// Routes for employee feature
// These are CHILDREN of /employees
// defined in app-routing.module.ts
const employeeRoutes: Routes = [

  // /employees → show list
  {
    path: '',
    // empty path because parent already has 'employees'
    // full URL = /employees
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
    // any logged in user can see list
  },

  // /employees/add → add form
  // IMPORTANT — 'add' must come BEFORE ':id'
  // Why? Angular matches routes top to bottom
  // If :id comes first — 'add' gets treated as an id!
  {
    path: 'add',
    component: AddEmployeeComponent,
    canActivate: [RoleGuard]
    // admin only
  },

  // /employees/1 → detail page
  {
    path: ':id',
    // :id captures the number from URL
    // /employees/1 → id = '1'
    // /employees/5 → id = '5'
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard]
    // any logged in user
  }
];

@NgModule({
  declarations: [
    // All components and pipes
    // belonging to this module
    EmployeeListComponent,
    EmployeeDetailComponent,
    AddEmployeeComponent,
    SearchFilterPipe
    // SearchFilterPipe lives here
    // because it's only used in employee list
  ],
  imports: [
    CommonModule,
    // NOT BrowserModule — very important!
    // BrowserModule only once in AppModule

    FormsModule,
    // for search input [(ngModel)]

    ReactiveFormsModule,
    // for add employee form

    RouterModule.forChild(employeeRoutes)
    // forChild — NOT forRoot!
    // forRoot creates Router service — done once in AppModule
    // forChild just adds more routes to existing Router
  ]
})
export class EmployeeModule {}