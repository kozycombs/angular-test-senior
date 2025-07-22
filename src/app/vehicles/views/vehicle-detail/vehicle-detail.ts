import { Component, OnDestroy, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../interfaces/vehicle';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, Location } from '@angular/common';
import {
  CURRENCY,
  DEFAULT_FINANCE_DEPOSIT_PERCENT,
  DEFAULT_FINANCE_DURATION,
} from '../../../constants/globalConsts';
import { FinanceCalculatorService } from '../../services/finance-calculator.service';
import { FinanceQuote } from '../../interfaces/finance-quote';
import { Spinner } from '../../../components/spinner/spinner';
import { NotFound } from '../../../not-found/not-found';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicle-detail',
  imports: [RouterLink, CurrencyPipe, Spinner, NotFound],
  templateUrl: './vehicle-detail.html',
  styleUrl: './vehicle-detail.scss',
})
export class VehicleDetail implements OnInit, OnDestroy {
  vehicle: Vehicle | null = null;
  currency = CURRENCY;
  loading = true;
  financeQuote: FinanceQuote | null = null;
  private subscriptions: Subscription[] = [];

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

  onGoBack(): void {
    this.location.back();
  }
}
