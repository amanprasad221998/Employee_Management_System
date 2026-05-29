import { Component, OnInit,
         ChangeDetectionStrategy,
         ChangeDetectorRef }
  from '@angular/core';
import { AuthService, User }
  from '../../core/auth.service';
import { EmployeeService, Employee }
  from '../../employee.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {

  currentUser: User | null = null;
  employees: Employee[] = [];
  isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.currentUser =
      this.authService.getCurrentUser();

    // Load employees for admin view
    this.employeeService.getEmployees()
      .subscribe({
        next: (data) => {
          this.employees = data;
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      });
  }

  trackById(index: number,
            emp: Employee): number {
    return emp.id;
  }
}