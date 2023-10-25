import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';


const routes: Routes = [
  {path: '',redirectTo:'expense',pathMatch:'full'},
  {path: 'expense',component:ExpenseFormComponent},
   {path: 'expense-list',component: ExpenseListComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
