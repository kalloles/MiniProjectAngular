import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';

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
  
  expenseList: any;



  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
   
    this.getList();
  }

  getList(){
    this.expenseService.getRequest('ExpensForm/expenses','').subscribe(
      (data: any) => {
       console.log(data);
        this.expenseList = data;
  
      })
  
  }
}
