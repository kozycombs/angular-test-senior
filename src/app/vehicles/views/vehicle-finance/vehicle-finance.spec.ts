import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFinance } from './vehicle-finance';
import { ActivatedRoute } from '@angular/router';

describe('VehicleFinance', () => {
  let component: VehicleFinance;
  let fixture: ComponentFixture<VehicleFinance>;

  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (v: string) => '',
      },
    },
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleFinance],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleFinance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
