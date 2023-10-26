import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent {
  expenses: any[] = []; 
  expName: any;
  amount: any;
  date: any;
  paidby: any;
  description: any;
  expenseList: any[] = [];
  // expenseList: any;



  constructor(private expenseService: ExpenseService,private router: Router) {}

  ngOnInit() {
   
    this.getList();
    const totalAmount = this.calculateTotalAmount();
    console.log('Total Amount:', totalAmount);
  }

  getList(){
    this.expenseService.getRequest('ExpensForm/expenses','').subscribe(
      (data: any) => {
       console.log(data);
        this.expenseList = data;
  
      })
  
  }
  navigateToHome(){
    this.router.navigate(['/expense']);
  }
  calculateTotalAmount(): number {
    let totalAmount = 0;
    this.expenseList.forEach((expense) => {
      totalAmount += expense.amount;
    });
    return totalAmount;
  }
}
