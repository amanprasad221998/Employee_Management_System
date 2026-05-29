import { Component, OnInit,
         ChangeDetectionStrategy }
  from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService, Employee }
  from '../../employee.service';
import { AuthService }
  from '../../core/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  // OnPush — perfect here because:
  // data comes via async pipe
  // async pipe triggers OnPush automatically
  // when Observable emits new data
})
export class EmployeeListComponent implements OnInit {

  // Observable — NOT array
  // async pipe subscribes in template
  // auto unsubscribes when component destroyed
  employees$!: Observable<Employee[]>;

  // Search term bound to input box
  searchTerm: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    public authService: AuthService
    // public — template needs to call isAdmin()
  ) {}

  

  ngOnInit() {
    // Assign Observable — NOT subscribing here
    // async pipe subscribes in template
    this.employees$ = this.employeeService
      .getEmployees();
  }

  // Called when user clicks a table row
  viewEmployee(id: number): void {
    // Navigate to detail page
    // /employees/1 or /employees/5 etc
    this.router.navigate(['/employees', id]);
  }
  // trackBy — helps Angular identify each row
  // Only updates changed rows
  // Without this — all rows recreated on every update
  trackById(index: number, emp: Employee): number {
    return emp.id;
  }

  
}