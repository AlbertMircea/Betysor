import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
   imports: [FormsModule , NgChartsModule],
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  @Input() expenses: any[] = [];

  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType = 'pie' as const;

  ngOnInit(): void {
    this.updateChartData();
  }

  ngOnChanges(): void {
    this.updateChartData();
  }

  updateChartData(): void {
    const categoryTotals: { [key: string]: number } = {};

    this.expenses.forEach(expense => {
      const cat = expense.category || 'Other';
      categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(expense.amount);
    });

    this.pieChartLabels = Object.keys(categoryTotals);
    this.pieChartData = Object.values(categoryTotals);
  }
}
