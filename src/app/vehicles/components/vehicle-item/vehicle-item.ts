import { Component, Input } from '@angular/core';
import { Vehicle } from '../../interfaces/vehicle';
import { CURRENCY } from '../../../constants/globalConsts';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-vehicle-item',
  imports: [CurrencyPipe],
  templateUrl: './vehicle-item.html',
  styleUrl: './vehicle-item.scss',
})
export class VehicleItem {
  @Input() vehicle: Vehicle | undefined;
  currency = CURRENCY;
}
