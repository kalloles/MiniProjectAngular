import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent {
  exprnseForm = new FormGroup({
    
    expName: new FormControl(''),
    amount: new FormControl(''),
    date: new FormControl(''),
    paidby: new FormControl(''),
    description: new FormControl(''),

  });
  serv: any;

onSubmit() {

  if(this.exprnseForm.value.expName && 
    this.exprnseForm.value.amount && 
    this.exprnseForm.value.date &&
    this.exprnseForm.value.paidby &&
    this.exprnseForm.value.description)
    {
      let req={

        expName:this.exprnseForm.value.expName,
        amount:this.exprnseForm.value.amount,
        date:this.exprnseForm.value.date,
        paidby:this.exprnseForm.value.paidby,
        description:this.exprnseForm.value.description,
    }

    this.serv.postRequest('expense/save',req).subscribe((data: any)=>{
      console.log(data);
      if(data.STATUS=="true"){
        alert('Form submission is successful......');
        this.exprnseForm.reset();
      }else{
        alert('Form submission is not successful please try again');
      }
    });
  }else{
    alert('Please fill expense form......');
  }
  console.log(this.exprnseForm.value);
  console.log("In expense")
      
    }

}


