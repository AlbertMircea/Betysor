import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, where, query} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  constructor(private firestore: Firestore) {}

  // Add a new expense
  addExpense(expense: { name: string; amount: number; category: string; date: string }) {
    const expensesRef = collection(this.firestore, 'expenses');
    return addDoc(expensesRef, expense);
  }

  // Get all expenses
  getExpenses(userId: string): Observable<any[]> {
    const expensesRef = collection(this.firestore, 'expenses');
    const q = query(expensesRef, where('userId', '==', userId));
    return collectionData(q, { idField: 'id' });
  }

  // Delete an expense
  deleteExpense(id: string) {
    const expenseDocRef = doc(this.firestore, `expenses/${id}`);
    return deleteDoc(expenseDocRef);
  }
}
