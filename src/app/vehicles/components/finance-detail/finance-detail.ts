import {
  Component,
  Input,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FinanceQuote } from '../../interfaces/finance-quote';
import { CurrencyPipe } from '@angular/common';
import { FincanceCalculatorInput } from '../../types/fincanceCalculatorInput';

type displayField = {
  label: string;
  value: string;
  currencyType: boolean;
};

@Component({
  selector: 'app-finance-detail',
  imports: [CurrencyPipe],
  templateUrl: './finance-detail.html',
  styleUrl: './finance-detail.scss',
})
export class FinanceDetail implements OnChanges {
  @Input() financeQuote: FinanceQuote | null = null;
  @Input() currency: string = '';
  @Input() financeCalculatorInput: FincanceCalculatorInput | undefined;

  displayFields: displayField[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.financeQuote) {
      this.displayFields = [
        {
          label: 'Car price',
          value: `${this.financeQuote.onTheRoadPrice}`,
          currencyType: true,
        },
        {
          label: 'Cash deposit',
          value: `${this.financeQuote.totalDeposit}`,
          currencyType: true,
        },
        {
          label: `${this.financeQuote.numberOfMonthlyPayments} monthly payments`,
          value: `${this.financeQuote.monthlyPayment}`,
          currencyType: true,
        },
        {
          label: 'Number of monthly payments',
          value: `${this.financeQuote.numberOfMonthlyPayments}`,
          currencyType: false,
        },
        {
          label: 'Total amount of credit',
          value: `${this.financeQuote.totalAmountOfCredit}`,
          currencyType: true,
        },
        {
          label: 'Option to purchase fee',
          value: '1',
          currencyType: true,
        },
      ];
    }
  }
}
