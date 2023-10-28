import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent {
  
  expenses: any[] = []; 
  id: any;
  expName: any;
  amount: any;
  date: any;
  paidby: any;
  description: any;
  expenseList: any[] = [];
expenseFlag: any;
  // expenseList: any;



  constructor(private expenseService: ExpenseService,private router: Router) {}

  ngOnInit() {
   
    this.getList();
    const totalAmount = this.calculateTotalAmount();
    console.log('Total Amount:', totalAmount);
  }

  getList(){
    this.expenseService.getRequest('ExpensForm/expensesList','').subscribe(
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
  editExpense(id:number){    
    const navigationExtras: NavigationExtras = { state: { id: id } };
    this.router.navigate(['/expense',navigationExtras],navigationExtras)
    // localStorage.setItem("ServiceId", id);
  }
}

