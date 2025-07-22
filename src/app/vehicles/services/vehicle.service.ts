import { Injectable } from '@angular/core';
import { Vehicle } from '../interfaces/vehicle';
import vehiclesData from '../../../../public/data/vehicles.json';
import { delay, Observable, of } from 'rxjs';
import { Sort } from '../enums/sort';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  getVehicles(): Observable<Vehicle[]> {
    return of(vehiclesData).pipe(delay(1000));
  }

  getVehicle(id: string): Observable<Vehicle | null> {
    const vehicle = this.findVehicleById(id, vehiclesData);
    return of(vehicle).pipe(delay(500));
  }

  sortVehicles(sortBy: string): Observable<Vehicle[]> {
    const sortedVehicles = this.handleVehiclesSort(sortBy, vehiclesData);
    return of(sortedVehicles).pipe(delay(500));
  }

  private findVehicleById(id: string, vehicles: Vehicle[]): Vehicle | null {
    const vehicle =
      vehicles.find((vehicle: Vehicle) => vehicle.id === id) || null;

    return vehicle;
  }

  private handleVehiclesSort(sortBy: string, vehicles: Vehicle[]): Vehicle[] {
    return vehicles.sort((a: Vehicle, b: Vehicle) => {
      switch (sortBy) {
        case Sort.PriceAscending: {
          const sort = this.sortFactory(a, b);
          return sort('price');
        }
        case Sort.PriceDescending: {
          const sort = this.sortFactory(b, a);
          return sort('price');
        }
        case Sort.AgeAscending: {
          const sort = this.sortFactory(b, a);
          return sort('year');
        }
        case Sort.AgeDescending: {
          const sort = this.sortFactory(a, b);
          return sort('year');
        }
        case Sort.MileageAscending: {
          const sort = this.sortFactory(a, b);
          return sort('mileage');
        }
        case Sort.MileageDescending: {
          const sort = this.sortFactory(b, a);
          return sort('mileage');
        }
        default: {
          return 0;
        }
      }
    });
  }

  private sortFactory(a: any, b: any): Function {
    return function (key: string): number {
      if (a[key] > b[key]) {
        return 1;
      } else if (b[key] > a[key]) {
        return -1;
      }
      return 0;
    };
  }
}
