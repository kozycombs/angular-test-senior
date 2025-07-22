import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetail } from './vehicle-detail';
import { VehicleService } from '../../services/vehicle.service';
import { FinanceCalculatorService } from '../../services/finance-calculator.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

describe('VehicleDetail', () => {
  let component: VehicleDetail;
  let fixture: ComponentFixture<VehicleDetail>;

  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (v: string) => '',
      },
    },
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleDetail],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
