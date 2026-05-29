import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components for eager routes
import { HomeComponent } from
  './pages/home/home.component';
import { LoginComponent } from
  './pages/login/login.component';
import { DashboardComponent } from
  './pages/dashboard/dashboard.component';
import { NotFoundComponent } from
  './pages/not-found/not-found.component';

// Import guards
import { AuthGuard } from './core/auth.guard';
// NOTE — RoleGuard is used inside
// AdminModule — not here

const routes: Routes = [

  // HOME — anyone can visit
  {
    path: '',
    component: HomeComponent
    // empty path = root URL
    // localhost:4200/
  },

  // LOGIN — anyone can visit
  {
    path: 'login',
    component: LoginComponent
    // localhost:4200/login
  },

  // DASHBOARD — logged in only
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
    // AuthGuard runs before component loads
    // not logged in → redirected to /login
  },

  // EMPLOYEES — lazy loaded
  // entire EmployeeModule downloads
  // only when user visits /employees
  // admin lazy load
{
  path: 'admin',
  loadChildren: () =>
    import('./admin/admin.module')
    // admin.module.ts is at src/app/admin/
    // so path is ./admin/admin.module ✅
      .then(m => m.AdminModule)
},

// employees lazy load
{
  path: 'employees',
  loadChildren: () =>
    import('./employee/employee.module')
    // employee.module.ts is at src/app/employee/
    // so path is ./employee/employee.module ✅
      .then(m => m.EmployeeModule)
},

  // 404 — ALWAYS LAST
  // catches any URL that didn't match above
  {
    path: '**',
    component: NotFoundComponent
    // ** = wildcard = everything else
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // forRoot — used ONCE in root module only
  // creates the Router service
  // registers all routes

  exports: [RouterModule]
  // export so AppModule can use router directives
  // routerLink, router-outlet etc
})
export class AppRoutingModule {}