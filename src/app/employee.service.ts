// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { catchError, forkJoin, map, Observable, of } from 'rxjs';

// export interface Employee{
//   id: number,
//   name: string,
//   email: string,
//   phone?: number,
//   department: string,
//   city: string,
//   website? : string
// }

// export interface DashboardStats{
//   totalEmployees: number,
//   totalDepartments: number,
//   activeEmployees: number
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {

  
//   private apiURL = 'https://jsonplaceholder.typicode.com/users';

//   constructor(private http: HttpClient, private router: Router) { 
//   }

//   getEmployees(): Observable<Employee[]>{
//     return this.http.get<any[]>(this.apiURL)
//     .pipe(
//       map(data => data.map(emp => ({
//         id: emp.id,
//         name: emp.name,
//         email: emp.email,
//         phone: emp.phone,
//         department: emp.company.name,
//         city: emp.address.city,
//         website: emp.website
//       }))),
//       catchError(error => {
//         console.error('Failes to load employees: ', error);
//         return of([]);
//       })
//     )
//   }

//   getEmployeeById(id: number): Observable<Employee | null>{
//     return this.http.get<any>(`${this.apiURL}/${id}`)
//     .pipe(
//       map(emp => ({
//         id: emp.id,
//         name: emp.name,
//         email: emp.email,
//         phone: emp.phone,
//         department: emp.department,
//         city: emp.address.city,
//         website: emp.website

//       })),
//       catchError(error => {
//         console.log("Failed to load employee: ", error);
//         return of(null);
//       })
//     )
//   }

//   getStats(): Observable<DashboardStats>{
//     return of ({
//       totalEmployees: 10,
//       totalDepartments: 5,
//       activeEmployees: 8
//     })
//   }

//   getDashboardData(): Observable<{employees: Employee[], stats: DashboardStats}>{
//     return forkJoin({
//       employees: this.getEmployees(),
//       stats: this.getStats()
//     });
//   }


// }
//////////After Dotnet Connection with real data/////////////////////////////////////
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

// Updated to match .NET Core API response
export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  isActive: boolean;
}

export interface CreateEmployee {
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
}

export interface UpdateEmployee {
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  isActive: boolean;
}

export interface DashboardStats {
  totalEmployees: number;
  totalDepartments: number;
  activeEmployees: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  // GET all employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employee`)
      .pipe(
        catchError(error => {
          console.error('Failed to load employees: ', error);
          return of([]);
        })
      );
  }

  // GET employee by ID
  getEmployeeById(id: number): Observable<Employee | null> {
    return this.http.get<Employee>(`${this.apiUrl}/employee/${id}`)
      .pipe(
        catchError(error => {
          console.error('Failed to load employee: ', error);
          return of(null);
        })
      );
  }

  // POST — create new employee
  createEmployee(employee: CreateEmployee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employee`, employee)
      .pipe(
        catchError(error => {
          console.error('Failed to create employee: ', error);
          return of({} as Employee);
        })
      );
  }

  // PUT — update employee
  updateEmployee(id: number, employee: UpdateEmployee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/employee/${id}`, employee)
      .pipe(
        catchError(error => {
          console.error('Failed to update employee: ', error);
          return of({} as Employee);
        })
      );
  }

  // DELETE — delete employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/employee/${id}`)
      .pipe(
        catchError(error => {
          console.error('Failed to delete employee: ', error);
          return of(null);
        })
      );
  }

  // Dashboard stats — calculated from real data
  getStats(): Observable<DashboardStats> {
    return this.getEmployees().pipe(
      map(employees => ({
        totalEmployees: employees.length,
        totalDepartments: [...new Set(employees.map(e => e.department))].length,
        activeEmployees: employees.filter(e => e.isActive).length
      }))
    );
  }

  // Dashboard data — employees + stats together
  getDashboardData(): Observable<{ employees: Employee[], stats: DashboardStats }> {
    return forkJoin({
      employees: this.getEmployees(),
      stats: this.getStats()
    });
  }
}