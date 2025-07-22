import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleList } from './vehicle-list';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

describe('VehicleList', () => {
  let component: VehicleList;
  let fixture: ComponentFixture<VehicleList>;

  const fakeSubscription = new Subscription();
  const fakeActivatedRoute = {
    queryParams: {
      subscribe: () => fakeSubscription,
    },
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleList],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
