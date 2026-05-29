import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


// Admin component
import { AdminComponent } from
  '../pages/admin/admin.component';
// Wait — where is admin component?
// ng generate created it at:
// src/app/pages/admin/admin.component.ts
// So import from there

import { RoleGuard } from '../core/role.guard';

// Admin routes
const adminRoutes: Routes = [
  {
    path: '',
    // empty path — parent has 'admin'
    // full URL = /admin
    component: AdminComponent,
    canActivate: [RoleGuard]
    // admin role required
  }
];

@NgModule({
  declarations: [
    AdminComponent
    // Only admin component here
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
    // forChild — adds to existing Router
  ]
})
export class AdminModule {}