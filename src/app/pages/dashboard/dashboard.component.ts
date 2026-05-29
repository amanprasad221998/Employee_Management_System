import { Component, OnInit,
         ChangeDetectionStrategy,
         ChangeDetectorRef }
  from '@angular/core';
import { AuthService, User }
  from '../../core/auth.service';
import { EmployeeService, Employee, DashboardStats }
  from '../../employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  // OnPush — only check this component when:
  // 1. Input reference changes
  // 2. Observable emits
  // 3. Event fires inside component
  // Improves performance — not checked on every event
})
export class DashboardComponent implements OnInit {

  // Current logged in user
  currentUser: User | null = null;

  // Dashboard data loaded by forkJoin
  employees: Employee[] = [];
  stats: DashboardStats | null = null;

  // Loading and error states
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
    // ChangeDetectorRef needed with OnPush
    // to manually trigger update after
    // async data arrives
  ) {}

  ngOnInit() {

    // Get current user from BehaviorSubject
    this.currentUser = this.authService.getCurrentUser();

    // Load dashboard data
    // forkJoin runs BOTH calls simultaneously
    this.employeeService.getDashboardData()
      .subscribe({

        next: (result) => {
          // Both calls completed successfully
          this.employees = result.employees;
          this.stats = result.stats;
          this.isLoading = false;

          // Manually tell OnPush to update
          // because data arrived asynchronously
          this.cdr.markForCheck();
        },

        error: (err) => {
          this.errorMessage =
            'Failed to load dashboard data.';
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      });
  }
  // trackBy function for ngFor
// helps Angular identify each row
// only updates changed rows — better performance
trackById(index: number, emp: Employee): number {
  return emp.id;
}
  
}