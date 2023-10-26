import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import{BlockUI,NgBlockUI}from 'ng-block-ui';
import { ExpenseService } from '../expense.service';
import { Router } from '@angular/router';
// import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit  {
  
  
  serv: any;
  @BlockUI()
  blockUI!: NgBlockUI;
  expName: any;
  amount: any;
  date: any;
  paidby: any;
  description: any;
  employeeList: any;
  exprnseForm : FormGroup<any> | undefined;
  

  constructor(private http: ExpenseService,private router: Router,private fb:FormBuilder) {
   
  }
  ngOnInit(): void {

    this.exprnseForm = this.fb.group({
    
      expName: ['',[Validators.required]],
      amount: ["",],
      date: ["",],
      paidby: ["",],
      description: ["",],
  
    });
    this.getEmployeeList();
  }

onSubmit() {

  let formData= {
    expName: this.expName,
    amount: this.amount,
    date: this.date,
    paidBy: parseInt(this.paidby),
    description: this.description,
   
  };
  this.http.postRequest('ExpensForm/save', formData).subscribe((response: any) => {
      console.log(response);
       console.log('Data saved successfully:', response);
        alert('Data saved successfully');
        this.exprnseForm?.value.reset();

    
    }
   
);

}

getEmployeeList(){
  this.http.getRequest('ExpensForm/employeeList','').subscribe(
    (data: any) => {
     console.log(data);
      this.employeeList = data;

    })

}

navigateToList(){

   this.router.navigate(['/expense-list']);


}

}


