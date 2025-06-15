import { Component, Input } from '@angular/core';
import { ExpenseService } from '../../../services/expense.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AddExpenseComponent {
  @Input() userId: string | null = null;
  @Input() showForm: boolean = false;

  name = '';
  amount: number = 0;
  selectedCategory = '';
  categories = [
    { name: 'Food', icon: '🍔', color: '#FF9F1C' },
    { name: 'Transport', icon: '🚗', color: '#2EC4B6' },
    { name: 'Shopping', icon: '🛍️', color: '#E71D36' },
    { name: 'Bills', icon: '💡', color: '#011627' },
    { name: 'Other', icon: '📝', color: '#314A5E' }
  ];

  constructor(private expenseService: ExpenseService) {}

  addExpense() {
    if (!this.userId || !this.name || !this.amount || !this.selectedCategory) return;

    const category = this.categories.find(cat => cat.name === this.selectedCategory) || this.categories[this.categories.length - 1];

    const newExpense = {
      name: this.name,
      amount: this.amount,
      category: category.name,
      icon: category.icon,
      color: category.color,
      date: new Date().toISOString(),
      userId: this.userId
    };

    this.expenseService.addExpense(newExpense).then(() => {
      this.name = '';
      this.amount = 0;
      this.selectedCategory = '';
      this.showForm = false;
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
