import { Component, OnInit,
         ChangeDetectionStrategy }
  from '@angular/core';
import { ActivatedRoute, Router }
  from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService, Employee }
  from '../../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailComponent implements OnInit {

  // Observable holding one employee
  employee$!: Observable<Employee | null>;

  constructor(
    private route: ActivatedRoute,
    // ActivatedRoute reads current URL info
    // gives us access to :id parameter

    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {

    // Step 1 — read :id from URL
    const idString = this.route.snapshot
      .params['id'];
    // snapshot = current URL at this moment
    // params['id'] = reads :id value
    // /employees/3 → idString = '3' (string)

    // Step 2 — convert string to number
    const id = +idString;
    // + operator converts string to number
    // '3' → 3
    // '10' → 10

    // Step 3 — fetch employee with this id
    this.employee$ = this.employeeService
      .getEmployeeById(id);
    // Returns Observable
    // async pipe subscribes in template
  }

  // Back button handler
  goBack(): void {
    this.router.navigate(['/employees']);
  }
}