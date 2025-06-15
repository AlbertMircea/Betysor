import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';         
import { ExpenseService } from '../../services/expense.service';  
import { User } from 'firebase/auth';
import { AddExpenseComponent } from "./add-expense/add-expense.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, AddExpenseComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User | null = null;

  name: string = '';
  amount: number = 0;
  category: string = '';
  expenses: any[] = [];

  userId: string | null = null;

  constructor(
    private authService: AuthService,
    private expenseService: ExpenseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(u => {
      this.user = u;
      this.userId = u?.uid || null;

      if (u) {
        // Fetch only this user's expenses
        this.expenseService.getExpenses(u.uid).subscribe(data => {
          this.expenses = data;
        });
      } else {
        this.expenses = [];
      }
    });
  }


  delete(id: string) {
    this.expenseService.deleteExpense(id);
  }
  showAddForm = false;

toggleAddForm() {
  this.showAddForm = !this.showAddForm;
}

 addExpenseFromChild(expense: any) {
  this.expenseService.addExpense(expense).then(() => {
    this.expenses.push(expense); // or re-fetch list
    this.showAddForm = false;    // ✅ auto-close form after adding
  });
}

get totalExpenses(): number {
  return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

}

