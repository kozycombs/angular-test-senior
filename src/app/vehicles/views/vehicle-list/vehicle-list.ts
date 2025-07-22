import { Component, OnDestroy, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../interfaces/vehicle';
import { VehicleItem } from '../../components/vehicle-item/vehicle-item';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sort } from '../../enums/sort';
import { Subscription } from 'rxjs';
import { Spinner } from '../../../components/spinner/spinner';
import { NotFound } from '../../../not-found/not-found';

@Component({
  selector: 'app-vehicle-list',
  imports: [VehicleItem, RouterLink, FormsModule, Spinner, NotFound],
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.scss',
})
export class VehicleList implements OnInit, OnDestroy {
  vehicles: Vehicle[] = [];
  sortBy: string = Sort.PriceAscending;
  sortValues = Sort;
  loading = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.queryParams.subscribe((params: Params) => {
        const sortBy = params['sort'] || '';
        let defaultSortBy = Sort.PriceAscending;

        if (Object.values(this.sortValues).includes(sortBy)) {
          defaultSortBy = sortBy;
        }

        this.sortBy = defaultSortBy;
        this.getVehicles(defaultSortBy);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  getVehicles(sortBy: string): void {
    this.loading = true;
    this.subscriptions.push(
      this.vehicleService.getVehicles(sortBy).subscribe((response) => {
        this.vehicles = response;
        this.loading = false;
      })
    );
  }

  handleSortChange(): void {
    this.router.navigate([''], { queryParams: { sort: this.sortBy } });
  }
}
