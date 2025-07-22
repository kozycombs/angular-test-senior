import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { VehicleService } from '../../services/vehicle.service';
import { FinanceCalculatorService } from '../../services/finance-calculator.service';
import { FincanceCalculatorInput } from '../../types/fincanceCalculatorInput';
import {
  CURRENCY,
  DEFAULT_FINANCE_DEPOSIT_PERCENT,
  DEFAULT_FINANCE_DURATION,
} from '../../../constants/globalConsts';
import { Vehicle } from '../../interfaces/vehicle';
import { FinanceQuote } from '../../interfaces/finance-quote';
import { FinanceDetail } from '../../components/finance-detail/finance-detail';
import { FinanceCalculator } from '../../components/finance-calculator/finance-calculator';
import { CurrencyPipe, Location } from '@angular/common';
import { Spinner } from '../../../components/spinner/spinner';
import { NotFound } from '../../../not-found/not-found';

@Component({
  selector: 'app-vehicle-finance',
  imports: [CurrencyPipe, FinanceDetail, FinanceCalculator, Spinner, NotFound],
  templateUrl: './vehicle-finance.html',
  styleUrl: './vehicle-finance.scss',
})
export class VehicleFinance implements OnInit {
  private subscriptions: Subscription[] = [];
  vehicle: Vehicle | null = null;
  currency = CURRENCY;
  loading = true;
  financeQuote: FinanceQuote | null = null;
  financeCalculatorInput: FincanceCalculatorInput = {
    deposit: 0,
    term: DEFAULT_FINANCE_DURATION,
  };

  constructor(
    private vehicleService: VehicleService,
    private financeCalculatorService: FinanceCalculatorService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');

    this.subscriptions.push(
      this.vehicleService.getVehicle(id || '').subscribe((response) => {
        if (response) {
          this.vehicle = response;
          const deposit = response.price * DEFAULT_FINANCE_DEPOSIT_PERCENT;
          this.financeCalculatorInput.deposit = deposit;
          this.calculateFinance(response, DEFAULT_FINANCE_DURATION, deposit);
        } else {
          this.loading = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  calculateFinance(vehicle: Vehicle, term: number, deposit: number): void {
    this.subscriptions.push(
      this.financeCalculatorService
        .getFinanceQuote(vehicle, term, deposit)
        .subscribe((response) => {
          this.financeQuote = response;
          this.loading = false;
        })
    );
  }

  handleFincanceCalculation(event: FincanceCalculatorInput): void {
    if (this.vehicle) {
      this.financeCalculatorInput.deposit = event.deposit;
      this.financeCalculatorInput.term = event.term;
      this.calculateFinance(
        this.vehicle,
        Number(this.financeCalculatorInput.term),
        Number(this.financeCalculatorInput.deposit)
      );
    }
  }

  onGoBack(): void {
    this.location.back();
  }
}
