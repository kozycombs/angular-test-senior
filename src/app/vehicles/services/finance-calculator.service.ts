import { Injectable } from '@angular/core';
import { Vehicle } from '../interfaces/vehicle';
import { Observable, of } from 'rxjs';
import { FinanceQuote } from '../interfaces/finance-quote';
import { FINANCE_PERCENTAGE_APR } from '../../constants/globalConsts';

@Injectable({
  providedIn: 'root',
})
export class FinanceCalculatorService {
  getFinanceQuote(
    vehicle: Vehicle,
    term: number,
    deposit: number
  ): Observable<FinanceQuote> {
    const financeQuote = this.calculateFinance(vehicle, term, deposit);
    return of(financeQuote);
  }

  private calculateFinance(
    vehicle: Vehicle,
    term: number,
    deposit: number
  ): FinanceQuote {
    const principalAmount = vehicle.price - deposit;
    const interestAmount = (principalAmount * FINANCE_PERCENTAGE_APR) / 100;

    // Total Amount of Credit = (Car Price - Deposit) + Interest Charges
    const totalAmountOfCredit = principalAmount + interestAmount;

    // Monthly payments = (Total cost - Deposit) / Term
    const monthlyPayment = (principalAmount + interestAmount) / term;

    const financeQuote: FinanceQuote = {
      onTheRoadPrice: vehicle.price,
      totalDeposit: deposit,
      totalAmountOfCredit,
      numberOfMonthlyPayments: term,
      monthlyPayment,
    };

    return financeQuote;
  }
}
