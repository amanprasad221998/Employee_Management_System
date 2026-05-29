import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  pure: true
})
export class SearchFilterPipe implements PipeTransform {

  transform(employees: any[], searchTerm: string): any[] {
    if (!employees) return [];
    if (!searchTerm || searchTerm.trim() === '') {
      return employees;
    }
    return employees.filter(emp =>
      emp.name.toLowerCase()
        .includes(searchTerm.toLowerCase().trim())
    );
  }
}