import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ExpenseService } from '../expense.service';
import {NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
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
  flag: number = 0;
  expenseId!: number;

  constructor(private http: ExpenseService, private router: Router, private fb: FormBuilder,
    public dialog: MatDialog, private https: HttpClient) {

    
      this.textFlag = 0;
      if(this.router.getCurrentNavigation()?.extras.state){
        // this.expenseId = this.router.getCurrentNavigation().extras.state.id | null;
        this.expenseId = this.router.getCurrentNavigation()?.extras?.state?.['id'];
        this.getEditProfile(this.expenseId);

        this.textFlag =1;

      }
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
    if(this.textFlag ===0){
    this.http.postRequest('ExpensForm/save', formData).subscribe((response: any) => {
      console.log(response);
      console.log('Data saved successfully:', response);
      Swal.fire("Thank you .... ", "Submitted successfully", "success")
      this.Fromreset();

    } );
  }else if(this.textFlag ===1){
    this.http.postRequest('ExpensForm/Update', formData).subscribe((data: any) => {
      console.log(data);
      Swal.fire("Thank you .... ", "Submitted successfully", "success")
      this.Fromreset();
    });

  }
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
  
    this.http.postRequest('ExpensForm/getEditExpense',request).subscribe(
      (data) =>{
        this.textFlag =1;
        this.expenseInfo = data;
        //this.exprnseForm?.setValue({
          this.expName = this.expenseInfo['Status']['expName'];
          this.amount = this.expenseInfo['Status']['amount'];
          this.date = this.expenseInfo['Status']['date'];
          this.paidby = this.expenseInfo['Status']['paidby'];

        }
        );
   
  }

}


