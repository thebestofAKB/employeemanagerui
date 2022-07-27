import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './Employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employees!: Employee[];
  public editEmployee: Employee | any;
  public deleteEmployee: Employee | any;

  public constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
      this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },

      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }

  //Add Employee
  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  //Update Employee
  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.addEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  //Delete Employee
  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public onOpenModal(employee: Employee|null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement("button");

    button.type = "button";
    button.style.display = "none";
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-bs-target', '#addEmployeeModal');
    }

    if (mode === 'edit'){
      this.editEmployee = employee;
      button.setAttribute('data-bs-target', '#updateEmployeeModal');
    }

    if (mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
