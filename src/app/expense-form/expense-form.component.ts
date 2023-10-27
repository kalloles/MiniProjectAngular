import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ExpenseService } from '../expense.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
// import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {
  toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  })

  serv: any;
  @BlockUI()
  blockUI!: NgBlockUI;
  expName: any;
  amount: any;
  date: any;
  paidby: any;
  description: any;
  employeeList: any;
  exprnseForm: FormGroup<any> | undefined;
  textFlag: any = 0;
  updateExpenseflag: number =0;
  expenseInfo: any;


  constructor(private http: ExpenseService, private router: Router, private fb: FormBuilder,
    public dialog: MatDialog) {

      

  }
  ngOnInit(): void {

    this.exprnseForm = this.fb.group({

      expName: ['', [Validators.required]],
      amount: ["",],
      date: ["",],
      paidby: ["",],
      description: ["",],

    });
    this.getEmployeeList();
  }

  Fromreset() {
    this.expName = "";
    this.amount = " ";
    this.date = " ";
    this.paidby = " ";
    this.description = " ";
  }


  onSubmit() {

    let formData = {
      expName: this.expName,
      amount: this.amount,
      date: this.date,
      paidBy: parseInt(this.paidby),
      description: this.description,

    };
    this.http.postRequest('ExpensForm/save', formData).subscribe((response: any) => {
      console.log(response);
      console.log('Data saved successfully:', response);
      Swal.fire("Thank you .... ", "Submitted successfully", "success")
      this.Fromreset();

    },
      // (error) => {
      //   console.error('Error:', error);
      //   Swal.fire('Error: Date not submitted or invalid', 'Close')
      // }

    );

    this.http.postRequest('ExpensForm/Update', formData).subscribe((data: any) => {
      console.log(data);
      Swal.fire("Thank you .... ", "Submitted successfully", "success")
      this.Fromreset();
    })


  }

  getEmployeeList() {
    this.http.getRequest('ExpensForm/employeeList', '').subscribe(
      (data: any) => {
        console.log(data);
        this.employeeList = data;


      })

  }

  navigateToList() {

    this.router.navigate(['/expense-list']);


  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getEditProfile(id: any){
    this.http.isTokenExpired();
    let request = {
      "expenseId": id
    }
  
    this.http.postRequest('ExpensForm/getExpense',request).subscribe(
      (data =>{
        this.updateExpenseflag =1;
        this.expenseInfo = data;
        this.exprnseForm?.setValue({
          expName : this.expenseInfo['expName'],
          amount : this.expenseInfo['amount'],
          date : this.expenseInfo['date'],
          paidby : this.expenseInfo['paidby'],

        })
      })
      
    )
  }
  // get f(){
  //   return this.exprnseForm?.controls;
  // }
    // fetchDataByExpenseId(expenseId :number){
    //   let request ={
    //     expenseId : this.
    //   }

    // }

}


